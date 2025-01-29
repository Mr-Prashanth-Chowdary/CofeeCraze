

const Featured = ()=>{
    const data = {
        Featured:[
        {
            id:1,
            img:'https://i.pinimg.com/564x/09/4b/a6/094ba6c3f2989e8b023b03f47ffbdc61.jpg',
            name:'Arabica Delight',
            about:'A classic blend with a smooth, rich flavor profile.'
        },
        {
            id:2,
            img:'https://i.pinimg.com/564x/09/4b/a6/094ba6c3f2989e8b023b03f47ffbdc61.jpg',
            name:'Bold Roast',
            about:'Experience the intense and robust taste with every sip.'
        },
        {
            id:3,
            img:'https://i.pinimg.com/564x/09/4b/a6/094ba6c3f2989e8b023b03f47ffbdc61.jpg',
            name:'Organic Harmony',
            about:'Ethically sourced and perfectly balanced for the eco-conscious coffee lover.'
        },
        {
            id:4,
            img:'https://i.pinimg.com/564x/09/4b/a6/094ba6c3f2989e8b023b03f47ffbdc61.jpg',
            name:'Arabica Delight',
            about:'A classic blend with a smooth, rich flavor profile.'
        },
        {
            id:5,
            img:'https://i.pinimg.com/564x/09/4b/a6/094ba6c3f2989e8b023b03f47ffbdc61.jpg',
            name:'Bold Roast',
            about:'Experience the intense and robust taste with every sip.'
        },
        {
            id:6,
            img:'https://i.pinimg.com/564x/09/4b/a6/094ba6c3f2989e8b023b03f47ffbdc61.jpg',
            name:'Organic Harmony',
            about:'Ethically sourced and perfectly balanced for the eco-conscious coffee lover.'
        },
    ]
    }
    return(
        <>
        <div className="mx-6">
        <h1 className="text-white">Featured</h1>
        <div className="py-4 flex flex-wrap gap-3 text-white">
            {
                data.Featured.map((product)=>{
                    return(
                        <div key={product.id} className="p-4 w-[calc((50%_-_0.5rem))] md:w-[calc((33.333%_-_0.5rem))] bg-[#2D2D2D]">
                        <img className="mb-2 w-[50%]" src={product.img} alt="product_img" />
                        <h2 className="text-sm md:text-lg">{product.name}</h2>
                        <h2 className="text-xs md:text-sm">{product.about}</h2>
                        </div>
                    )
                })
            }
        </div>
        </div>
        </>
    )
}

export default Featured