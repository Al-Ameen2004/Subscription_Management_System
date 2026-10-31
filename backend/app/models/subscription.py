from datetime import date

from sqlalchemy import String, Date, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class Subscription(Base):
    __tablename__ = "subscriptions"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    subscription_number: Mapped[str] = mapped_column(
        String(50), unique=True, nullable=False
    )

    customer_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"), nullable=False
    )

    plan_id: Mapped[int] = mapped_column(
        ForeignKey("plans.id"), nullable=False
    )

    start_date: Mapped[date] = mapped_column(Date, nullable=False)
    expiry_date: Mapped[date] = mapped_column(Date, nullable=False)

    payment_terms: Mapped[str] = mapped_column(
        String(50), default="Due on receipt"
    )

    status: Mapped[str] = mapped_column(
        String(30), default="draft", nullable=False
    )