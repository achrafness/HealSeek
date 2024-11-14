from pymongo import mongo_client
import pymongo
from app.config import settings

client = mongo_client.MongoClient(settings.DATABASE_URL)
print('Connected to MongoDB...')

db = client[settings.MONGO_INITDB_DATABASE]
User = db.users
Quiz = db.quizzes
Lesson = db.lessons
Language = db.languages
Badge = db.badges
LeaderBoard = db.leaderboards