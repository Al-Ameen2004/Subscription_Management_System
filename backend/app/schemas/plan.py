from datetime import date
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, model_validator


class PlanCreate(BaseModel):
    name: str = Field(min_length=2, max_length=150)
    description: str | None = None
    billing_interval: Literal["daily", "weekly", "monthly", "yearly"]
    price: float = Field(ge=0)
    minimum_quantity: int = Field(default=1, ge=1)
    start_date: date
    end_date: date | None = None
    auto_close: bool = False

    @model_validator(mode="after")
    def validate_dates(self):
        if self.end_date and self.end_date < self.start_date:
            raise ValueError("End date cannot be before start date")
        return self


class PlanRead(PlanCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)


class PlanUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    billing_interval: Literal["daily", "weekly", "monthly", "yearly"] | None = None
    price: float | None = Field(default=None, ge=0)
    minimum_quantity: int | None = Field(default=None, ge=1)
    start_date: date | None = None
    end_date: date | None = None
    auto_close: bool | None = None