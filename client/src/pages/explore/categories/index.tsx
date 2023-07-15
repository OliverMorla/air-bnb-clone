const Categories = () => {

  interface Category { 
    id: number;
    name: string;
    source: string;
  }

  const categories: Array<Category> = [
    { id: 1, name: 'House', source: './assets/categories/House.svg' },
    { id: 2, name: 'Farm', source: './assets/categories/Farm.svg' },
    { id: 3, name: 'Cabin', source: './assets/categories/Cabin.svg' },
    { id: 4, name: 'Apartment', source: './assets/categories/Apartment.svg' },
    { id: 5, name: 'Cave', source: './assets/categories/Cave.svg' },
    { id: 6, name: 'Bed', source: './assets/categories/Bed.svg' },
    { id: 7, name: 'Castle', source: './assets/categories/Castle.svg' },
    { id: 8, name: 'Container', source: './assets/categories/Container.svg' },
    { id: 9, name: 'Guest', source: './assets/categories/Guest.svg' },
    { id: 10, name: 'Hotel', source: './assets/categories/Hotel.svg' },
    { id: 11, name: 'Barn', source: './assets/categories/Barn.svg' },
    { id: 12, name: 'Windmill', source: './assets/categories/Windmill.svg' },
    { id: 13, name: 'Tent', source: './assets/categories/Tent.svg' },
    { id: 14, name: 'Trullo', source: './assets/categories/Trullo.svg' },
    { id: 15, name: 'Raid', source: './assets/categories/Raid.svg' },
    { id: 16, name: 'Houseboat', source: './assets/categories/Houseboat.svg' },
    { id: 17, name: 'Dome', source: './assets/categories/Dome.svg' },
    { id: 18, name: 'Yurt', source: './assets/categories/Yurt.svg' },
    { id: 19, name: 'TreeHouse', source: './assets/categories/TreeHouse.svg' },
    { id: 20, name: 'TinyHome', source: './assets/categories/TinyHome.svg' },
    { id: 21, name: 'Ryokan', source: './assets/categories/Ryokan.svg' },
    { id: 22, name: 'Dammuso', source: './assets/categories/Dammuso.svg' },
    { id: 23, name: 'CycladicHome', source: './assets/categories/CycladicHome.svg' },
    { id: 24, name: 'CasaParticular', source: './assets/categories/CasaParticular.svg' },
    { id: 25, name: 'Piano', source: './assets/categories/Piano.svg' },
    { id: 26, name: 'Pool', source: './assets/categories/Pool.svg' },
    { id: 27, name: 'Patio', source: './assets/categories/Patio.svg' },
    { id: 28, name: 'Fireplace', source: './assets/categories/Fireplace.svg' }
  ];

  return (
    <>
      {categories.map((category) => (
        <div key={category.id} className="category-wrapper">
          <img src={category.source} alt={category.name} className="category-icon"/>
          <p>{category.name}</p>
        </div>
      ))}
    </>
  );
};

export default Categories;
