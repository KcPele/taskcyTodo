#this is a full crud with auth api with a fake db
from fastapi import FastAPI
import users
import todos

app = FastAPI()

app.include_router(users.router)
app.include_router(todos.router)
@app.get("/")
async def index():
    return {"msg":"home page here"}

