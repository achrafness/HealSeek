from fastapi import APIRouter, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.routes.auth_routes import router as auth_router
from app.routes.user_routes import router as user_router
from app.routes.rating_routes import router as rating_router
from app.routes.insurance import router as insurance_router
from app.routes.language_routes import router as language_router
from app.routes.websocket_endpoint import router as websocket_router
from app.routes.notifications_routes import router as notifications_router
from app.routes.appointments_routes import router as appointments_router

router = APIRouter()

# Define the security scheme
security = HTTPBearer(auto_error=False)

# Include routers with prefixes and tags
router.include_router(auth_router, prefix='/auth', tags=['auth'])
router.include_router(user_router, prefix='/users', tags=['user'])
router.include_router(rating_router, prefix='/ratings', tags=['rating'])
router.include_router(insurance_router, prefix='/insurance', tags=['insurance'])
router.include_router(language_router, prefix='/language', tags=['language'])
router.include_router(websocket_router, prefix='/ws', tags=['ws'])
router.include_router(notifications_router, prefix='/notifications', tags=['notifications'])
router.include_router(appointments_router, prefix='/appointments', tags=['appointments'])