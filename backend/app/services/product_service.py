from sqlalchemy.orm import Session

from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate


def create_product(db: Session, data: ProductCreate):
    product = Product(**data.model_dump())

    db.add(product)
    db.commit()
    db.refresh(product)

    return product


def get_products(db: Session):
    return db.query(Product).all()


def get_product(db: Session, product_id: int):
    return db.query(Product).filter(Product.id == product_id).first()


def update_product(db: Session, product_id: int, data: ProductUpdate):
    product = get_product(db, product_id)

    if not product:
        return None

    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)

    return product


def delete_product(db: Session, product_id: int):
    product = get_product(db, product_id)

    if not product:
        return False

    db.delete(product)
    db.commit()

    return True