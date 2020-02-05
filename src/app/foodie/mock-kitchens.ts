export interface Kitchen {
    id: string;
    ownerId: string;
    title: string;
    address: {line1: string, pin: string};
    image: { path: string, url: string };
    description: string;
    pureVeg: boolean;
    menuItemsCount: number;
    likeCount: number;
}

export interface IMenuItem {
  kitchenId: string;
  menuId: string;
  title: string;
  price: number;
  image: {path: string, url: string};
  isNonVeg: boolean;
  serving: number;
  orderType?: string;
  orderTime?: string;
  availability?: string[];
  description?: string;
  // createdAt?: firebase.firestore.FieldValue;
}

export const MENUS: IMenuItem [] = [
  { kitchenId: 'i11',
    menuId: 'm1',
    title: 'Chicken Tikka Masala',
    price: 10,
    isNonVeg: true,
    serving: 2,
    image: {
      path: 'assets/NorthIndian.jpg',
      url: 'src/assets/NorthIndian.jpg'
    }
  },
  {
    kitchenId: 'i11',
    menuId: 'm2',
    title: 'Veg Thali',
    price: 10,
    isNonVeg: false,
    serving: 1,
    image: {
      path: 'assets/Punjabi.jpg',
      url: 'assets/Punjabi.jpg'
    }
  },
];

export const KITECHENS: Kitchen[] = [
    { id: 'i11', ownerId: 'o11',
      title: 'Ambikesh`s kitchen',
      address: {line1: '2 Forest Laneway, NorthYork, ON', pin: 'M2N5X7'},
      image: {
          path: 'assets/profile_placeholder.png',
          url: 'assets/profile_placeholder.png'
        },
    description: 'Dear foodie, I am here to serve authenthic Indian cusine. Currently taking orders on request only.',
      pureVeg: false,
      menuItemsCount: 0,
      likeCount: 107
     },
    {
        id: 'i12', ownerId: 'o12',
        title: 'Piryanka`s kitchen',
        address: { line1: '2 Forest Laneway, NorthYork, ON', pin: 'M2N5X7' },
        image: { path: 'assets/profile_placeholder.png',
          url: 'assets/profile_placeholder.png' },
        description: 'Add more info here',
        pureVeg: true,
        menuItemsCount: 0,
        likeCount: 0
    },
    {
        id: 'i13', ownerId: 'o13',
        title: 'Nilesh kitchen',
        address: { line1: '4 Forest Laneway, NorthYork, ON', pin: 'M2N5X7' },
        image: { path: 'assets/profile_placeholder.png',
          url: 'assets/profile_placeholder.png' },
        description: 'Add more info here',
        pureVeg: true,
        menuItemsCount: 0,
        likeCount: 0
    },
    {
        id: 'i14', ownerId: 'o14',
        title: 'Vivek kitchen',
        address: { line1: '2 Forest Laneway, NorthYork, ON', pin: 'M2N5X7' },
        image: { path: 'assets/profile_placeholder.png',
          url: 'assets/profile_placeholder.png' },
        description: 'Add more info here',
        pureVeg: true,
        menuItemsCount: 0,
        likeCount: 0
    },
    {
        id: 'i15', ownerId: 'o15',
        title: 'Amrit kitchen',
        address: { line1: '2 Forest Laneway, NorthYork, ON', pin: 'M2N5X7' },
        image: { path: 'assets/profile_placeholder.png',
          url: 'assets/profile_placeholder.png' },
        description: 'Add more info here',
        pureVeg: true,
        menuItemsCount: 0,
        likeCount: 0
    },
    {
        id: 'i16', ownerId: 'o16',
        title: 'Vidhi kitchen',
        address: { line1: 'Forest Menor, NorthYork, ON', pin: 'M2N5X7' },
        image: { path: 'assets/profile_placeholder.png',
          url: 'assets/profile_placeholder.png' },
        description: 'Add more info here',
        pureVeg: true,
        menuItemsCount: 0,
        likeCount: 0
    }
];
