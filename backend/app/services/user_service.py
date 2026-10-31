from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.models.user import User
from app.schemas.user import UserCreate


def register_user(db: Session, user_data: UserCreate) -> User:
    # Check whether this email is already registered
    existing_user = db.query(User).filter(
        User.email == user_data.email
    ).first()

    if existing_user:
        raise ValueError("Email is already registered")

    # Hash the password before storing it
    hashed_password = hash_password(user_data.password)

    # Create the database user
    new_user = User(
        name=user_data.name,
        email=str(user_data.email),
        hashed_password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

from app.core.security import verify_password, create_access_token


def login_user(db: Session, email: str, password: str):
    # Find user by email
    user = db.query(User).filter(User.email == email).first()

    # Check user and password
    if not user or not verify_password(password, user.hashed_password):
        return None

    # Generate login token
    token = create_access_token(user.id)

    return token