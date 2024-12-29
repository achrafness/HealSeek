from fastapi import APIRouter , HTTPException
""" from app.routes.user import router as user_router """
from app.routes.auth_routes import router as auth_router
from app.routes.user_routes import router as user_router
from app.routes.rating_routes import router as rating_router
from app.routes.insurance import router as insurance_router
from app.routes.language_routes import router as language_router
from app.routes.websocket_endpoint import router as websocket_router
from app.routes.notifications_routes import router as notifications_router
from app.routes.appointments_routes import router as appointments_router

router = APIRouter()

""" router.include_router(user_router, prefix='/user', tags=['user']) """
router.include_router(auth_router , prefix='/auth' , tags=['auth'])
router.include_router(user_router , prefix='/user' , tags=['user'])
router.include_router(rating_router , prefix='/rating' , tags=['rating'])
router.include_router(insurance_router , prefix='/insurance' , tags=['insurance'])
router.include_router(language_router , prefix='/language' , tags=['language'])
router.include_router(websocket_router , prefix='/ws' , tags=['ws'])
router.include_router(notifications_router , prefix='/notifications' , tags=['notifications'])
router.include_router(appointments_router , prefix='/appointments' , tags=['appointments'])