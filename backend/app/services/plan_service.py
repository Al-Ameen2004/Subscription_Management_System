from sqlalchemy.orm import Session

from app.models.plan import Plan
from app.schemas.plan import PlanCreate, PlanUpdate


def create_plan(db: Session, data: PlanCreate):
    plan = Plan(**data.model_dump())

    db.add(plan)
    db.commit()
    db.refresh(plan)

    return plan


def get_plans(db: Session):
    return db.query(Plan).all()


def get_plan(db: Session, plan_id: int):
    return db.query(Plan).filter(Plan.id == plan_id).first()


def update_plan(db: Session, plan_id: int, data: PlanUpdate):
    plan = get_plan(db, plan_id)

    if not plan:
        return None

    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(plan, key, value)

    db.commit()
    db.refresh(plan)

    return plan


def delete_plan(db: Session, plan_id: int):
    plan = get_plan(db, plan_id)

    if not plan:
        return False

    db.delete(plan)
    db.commit()

    return True