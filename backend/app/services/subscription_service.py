import uuid
from sqlalchemy.orm import Session

from app.models.subscription import Subscription
from app.models.user import User
from app.models.plan import Plan
from app.schemas.subscription import SubscriptionCreate


def create_subscription(db: Session, data: SubscriptionCreate):
    customer = db.query(User).filter(
        User.id == data.customer_id
    ).first()

    if not customer:
        raise ValueError("Customer not found")

    if customer.role != "customer":
        raise ValueError("Selected user is not a customer")

    plan = db.query(Plan).filter(
        Plan.id == data.plan_id
    ).first()

    if not plan:
        raise ValueError("Plan not found")

    subscription = Subscription(
        subscription_number=f"SUB-{uuid.uuid4().hex[:8].upper()}",
        customer_id=data.customer_id,
        plan_id=data.plan_id,
        start_date=data.start_date,
        expiry_date=data.expiry_date,
        payment_terms=data.payment_terms,
        status="draft"
    )

    db.add(subscription)
    db.commit()
    db.refresh(subscription)

    return subscription


def get_subscriptions(db: Session):
    return db.query(Subscription).all()


def get_subscription(db: Session, subscription_id: int):
    return db.query(Subscription).filter(
        Subscription.id == subscription_id
    ).first()


def update_subscription_status(
    db: Session,
    subscription_id: int,
    new_status: str
):
    subscription = get_subscription(db, subscription_id)

    if not subscription:
        return None

    subscription.status = new_status
    db.commit()
    db.refresh(subscription)

    return subscription