# module for storing the profile to database

from mongoengine import *
from util.settings import Settings
import datetime

class Post(EmbeddedDocument):
    caption = StringField()
    location = DictField()
    imgs = ListField(StringField())
    imgdesc = ListField(StringField())
    preview_img = StringField()
    likes = DictField()
    views = IntField()
    url = StringField()
    date = StringField(default=datetime.datetime.utcnow)
    created_at = DateTimeField(default=datetime.datetime.utcnow)
    comments = DictField()
    mentions = ListField(StringField())
    tags = ListField(StringField())

class Profile(DynamicDocument):
    username = StringField(max_length=120)
    alias = StringField()
    bio = StringField()
    prof_img = StringField()
    followers = DictField()
    following = DictField()
    num_of_posts = IntField()
    bio_url = StringField()
    isprivate = BooleanField()
    scraped = DateTimeField(default=datetime.datetime.utcnow)
    created_at = DateTimeField(default=datetime.datetime.utcnow)
    posts = ListField(EmbeddedDocumentField(Post))


class Database(object):
    """
       Module for database related operations
    """

    def __init__(self):
        connect(host=Settings.MONGO_URI)
    

    def insert(self, data):
        posts = [Post(**value) for value in data.get("posts")] if data is not None else []
        data.pop("posts", None)
        record = Profile(**data)
        record.posts = posts
        record.save()
    

