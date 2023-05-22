export async function getAll() {
  const all = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await all.json();
  return products;
}

export async function getJewelry() {
  const jewelry = await fetch(
    "https://fakestoreapi.com/products/category/jewelery"
  );
  const products: Product[] = await jewelry.json();
  return products;
}

export async function getElectronics() {
  const electronics = await fetch(
    "https://fakestoreapi.com/products/category/electronics"
  );
  const products: Product[] = await electronics.json();
  return products;
}
export async function getManClothes() {
  const manCloth = await fetch(
    "https://fakestoreapi.com/products/category/men%20clothing"
  );
  const products: Product[] = await manCloth.json();
  return products;
}

export async function getWomanClothes() {
  const womanCloth = await fetch(
    "https://fakestoreapi.com/products/category/women%20clothing"
  );
  const products: Product[] = await womanCloth.json();
  return products;
}
