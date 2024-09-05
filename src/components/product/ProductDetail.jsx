import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RelatedProduct from './RelatedProduct';

function ProductDetail() {
  const [product, setProduct] = useState();  
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`http://localhost:5000/api/product/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        
        });
        console.log(api.data)
        setProduct(api.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  },[id]);

  
  return (
    <div style={{marginTop:'20px'}}>
    <div className='container text-center my-5 p-5' style={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
        <div className='left'>
            <img src={product?.image} alt=''  style={{
                      width: "250px",
                      height: "250px",
                      borderRadius: "10px",
                      border: "2px solid yellow",
                    }}/>
        </div>
        <div className='right'>
            <h1>{product?.title}</h1>
            <p>{product?.description}</p>
            <h1>{product?.price}{''} {'₹'}</h1>
            <div className='my-5'>
                <button className='btn btn-danger mx-3' style={{fontWeight:'bold'}}>Buy Now</button>
                <button className='btn btn-warning' style={{fontWeight:'bold'}}>Add To Cart</button>
            </div>
        </div>
    </div>

    <RelatedProduct category={product?.category}/>
    </div>
  );
}

export default ProductDetail;
