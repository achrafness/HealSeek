from fastapi import APIRouter , HTTPException ,Depends , Request
from app.controllers.ratings_controller import get_all_ratings , add_rating , get_rating_by_id , update_rating , delete_rating
from app.models.rating import Rating
from app.routes.user_routes import resolve_user

router = APIRouter()

@router.get('/ratings')
def get_all():
    return get_all_ratings()

@router.post('/add_rating/' , dependencies=[Depends(resolve_user(allowed_roles=["patient"]))])
def add(request : Request,rating:Rating):
    return add_rating(request,rating=rating)

@router.get('/get_rating_by_id/{rating_id}')
def get_by_id(rating_id:int):
    return get_rating_by_id(rating_id)

@router.put("/update_rating/{rating_id}" , dependencies=[Depends(resolve_user(allowed_roles=["patient"]))])
def update( request :Request, rating_id:int , rating:dict):
    return update_rating(request,rating_id , rating)

@router.delete("/delete_rating/{rating_id}" , dependencies=[Depends(resolve_user(allowed_roles=["patient" ,"admin"]))])
def delete(rating_id:int):
    return delete_rating(rating_id)