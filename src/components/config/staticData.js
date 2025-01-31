const data = {
    Featured: [
        {
            id: 1,
            img: 'https://i.pinimg.com/564x/09/4b/a6/094ba6c3f2989e8b023b03f47ffbdc61.jpg',
            name: 'Arabica Delight',
            about: 'A classic blend with a smooth, rich flavor profile.',
            price: 12,
            keyword: ['black-coffee', 'dark', 'low sugar']
        },
        {
            id: 2,
            img: 'https://i.pinimg.com/564x/09/4b/a6/094ba6c3f2989e8b023b03f47ffbdc61.jpg',
            name: 'Bold Roast',
            about: 'Experience the intense and robust taste with every sip.',
            price: 14
        },
        {
            id: 3,
            img: 'https://i.pinimg.com/564x/09/4b/a6/094ba6c3f2989e8b023b03f47ffbdc61.jpg',
            name: 'Organic Harmony',
            about: 'Ethically sourced and perfectly balanced for the eco-conscious coffee lover.',
            price: 15
        },
        {
            id: 4,
            img: 'https://i.pinimg.com/564x/09/4b/a6/094ba6c3f2989e8b023b03f47ffbdc61.jpg',
            name: 'Arabica Delight',
            about: 'A classic blend with a smooth, rich flavor profile.',
            price: 18
        },
        {
            id: 5,
            img: 'https://i.pinimg.com/564x/09/4b/a6/094ba6c3f2989e8b023b03f47ffbdc61.jpg',
            name: 'Bold Roast',
            about: 'Experience the intense and robust taste with every sip.',
            price: 12
        },
        {
            id: 6,
            img: 'https://i.pinimg.com/564x/09/4b/a6/094ba6c3f2989e8b023b03f47ffbdc61.jpg',
            name: 'Organic Harmony',
            about: 'Ethically sourced and perfectly balanced for the eco-conscious coffee lover.',
            price: 16
        },
    ]
};

// Use a function if you want a dynamic cart
const getCart = () => [
    {
        item: data.Featured[0]
    }
];

export { data, getCart }; 
