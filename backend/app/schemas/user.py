import re

from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
    field_validator
)

from app.models.roles import UserRole


class UserCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=9)

    @field_validator("password")
    @classmethod
    def validate_password(cls, password: str):
        if not re.search(r"[A-Z]", password):
            raise ValueError("Password must contain an uppercase letter")

        if not re.search(r"[a-z]", password):
            raise ValueError("Password must contain a lowercase letter")

        if not re.search(r"[^A-Za-z0-9]", password):
            raise ValueError("Password must contain a special character")

        return password


class UserRead(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: UserRole

    model_config = ConfigDict(from_attributes=True)

class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"