import os
import cv2
import pandas as pd
from fastapi import FastAPI, File
from fastapi.middleware.cors import CORSMiddleware
from api.get_data import get_dogs, get_similar_ids
from api.get_data import get_similar_dogs
from tempfile import TemporaryDirectory
from transformers import pipeline

qna = pipeline("question-answering")

local_storage_path = "../persistent/data/"
# load the dataset
df = pd.read_csv(local_storage_path + "dogs_subset.csv")

# initialize FastAPI
app = FastAPI()

# origins = [
#     "http://localhost",
#     "http://localhost:3000",
# ]
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/dogs/{total}")
def home(total: int):
    dogs = get_dogs(df, total)
    return dogs

@app.get("/dogs/similar/{dog_id}")
def get_similar(dog_id: int):
    similar_ids = get_similar_ids(dog_id)
    similar_df = df[df['AnimalInternal-ID'].isin(similar_ids)]
    similar_dogs = get_dogs(similar_df, 20)
    return {'data': similar_dogs[1:7]}

# @app.post("/file")
@app.post("/file")
async def predict(
        file: bytes = File(...)
):
    print("File information received!")
    print("file:", len(file), type(file))
    # Save the image
    with TemporaryDirectory() as image_dir:
        image_path = os.path.join(image_dir, "test.png")
        with open(image_path, "wb") as output:
            output.write(file)

        print("image_path: ", image_path)
        # read the image
        image = cv2.imread(image_path)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        print("Image", image.shape)
        similar_ids = get_similar_dogs(image)
        similar_df = df[df['AnimalInternal-ID'].isin(similar_ids)]
        similar_dogs = get_dogs(similar_df, 10)
        print(similar_dogs[:4])
        return {'data': similar_dogs}

# this route will handle chatbot messages
@app.get("/chat/{dog_id}/{question}")
def respond(dog_id : int, question):
    try:
        if dog_id in df['AnimalInternal-ID'].values:
            context = df[df['AnimalInternal-ID'] == dog_id]['MemoText'].values
            answer = qna(question=question, context=context[0])
            return {"data": answer['answer']}
        else:
            return {"error": "dog id does not exists!"}
    except:
        return {"data": "something went wrong!"}