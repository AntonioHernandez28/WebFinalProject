import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
          name: 'Antonio',
          email: 'admin@example.com',
          password: bcrypt.hashSync('5tR83bG', 8),
          isAdmin: true,
        },
        {
          name: 'Antonio',
          email: 'user@example.com',
          password: bcrypt.hashSync('1234', 8),
          isAdmin: false,
        },
    ],
    products:[
        {
            name: 'Toner 85A', 
            category: 'Toner', 
            image: '/images/product1.jpg', 
            price: 120,
            countInStock: 2, 
            brand: 'Compatible', 
            rating: 1.5, 
            numReviews: 10, 
            description: 'Toner Compatible',
        }, 
        {
            name: 'Toner 86A', 
            category: 'Toner', 
            image: '/images/product1.jpg', 
            price: 121,
            countInStock: 3, 
            brand: 'Compatible', 
            rating: 4, 
            numReviews: 10, 
            description: 'Toner Compatible'
        },
        {
            name: 'Toner 87A', 
            category: 'Toner', 
            image: '/images/product1.jpg', 
            price: 122, 
            countInStock: 4,
            brand: 'Compatible', 
            rating: 4.5, 
            numReviews: 10, 
            description: 'Toner Compatible'
        },
        {
            name: 'Toner 88A', 
            category: 'Toner', 
            image: '/images/product1.jpg', 
            price: 123, 
            countInStock: 5,
            brand: 'Compatible', 
            rating: 5, 
            numReviews: 10, 
            description: 'Test de que el Repo jale bien siiiuuuuhh'
        },
        {
            name: 'Toner 89A', 
            category: 'Toner', 
            image: '/images/product1.jpg', 
            price: 124, 
            countInStock: 0,
            brand: 'Compatible', 
            rating: 3.5, 
            numReviews: 10, 
            description: 'Toner Compatible Siuuuuh done repo'
        },
    ],
}; 
export default data; 