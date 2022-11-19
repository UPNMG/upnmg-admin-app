/* eslint-disable  */
import React from 'react'
import { useHistory } from 'react-router-dom'
import RenderHirePurchasePage from '../RenderHirePurchasePage'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function ProductDetailed() {
    const history = useHistory()
    const product = history.location.state.product

    console.log('product', product)

  return (
    <RenderHirePurchasePage>
        <div className='ProductDetailed'>
        <button className="backBtn mb-2" onClick={() => history.goBack()} >Back</button>
        
        <div className="imageAndInfo">
          <div className="imageSection">
          <Carousel
              autoPlay={false}
              infiniteLoop
              labels={false} 
              showIndicators={false}
              showThumbs={true}
              showStatus={false}
              className="slider"
            >
              {product?.images?.map((img, index) => {
                console.log('img', img)
                return (
                  <div key={index}>
                    <img src={img?.url} alt="product"/>
                  </div>
                );
              })}
              {/* <p className="legend">Legend 1</p> */}
              {/* <div>
                <img src="/images/chat.png" />
                <p className="legend">Legend 2</p>
              </div> */}
            </Carousel>
          </div>
          <div className="smallInfoSection">
            <h2 className="productTitle text-2xl font-semibold leading-tight pb-2">{product?.product_name}</h2>
            <p className="small_description">{product?.short_description}</p>
            {product?.quantity > 0 ? (
              <p className="stockAvialable">Avaialable Instock</p>
            ) : (
              <p className="outOfStock"> Out of stock</p>
            )}

            <div className="price">
              <div className="formGroup">
            
              <div className="currentPrice">&#8373;{product?.new_price}</div>
              <div className="oldPrice">&#8373;{product?.old_price}</div>
              
              </div>
             
            </div>
            <div className="sizeFilters">
              <h6>Sizes</h6>
              <div className="sizes">
                {product?.sizes?.map((size, index) => {
                  return <div key={index}>{size}</div>;
                })}
             
              </div>
            </div>

            <div className="colorFilters">
              <h6 className="title">Colors</h6>
              <div className="colors">
              {product?.colors?.map((color, index) => {
                  return <div key={index} style={{background: `${color}`, color:`${'white'}`, fontSize: '.8rem'}}></div>;
                })}

                {/* <div style={{ background: "black" }}></div>
                <div style={{ background: "rgb(221, 118, 0)" }}></div>
                <div style={{ background: "rgb(0, 103, 221)" }}></div>
                <div style={{ background: "rgb(121, 121, 121)" }}></div>
                <div style={{ background: "rgba(0, 148, 91, 0.548)" }}></div>
                <div style={{ background: "rgb(0, 177, 221)" }}></div> */}
              </div>
            </div>
            <div className="quantity">
              <div>Quantity</div>
              <input
                type={"number"}
               
                readOnly
                defaultValue={product?.quantity}
                className="form-control"
                // onChange={(e) => {
                //   setQuantity(e?.target?.value)
                // }}
              />
            </div>
   
          </div>
        </div>
        <div className="detailDescription">
          <h4 className='pt-3'>Detailed Description</h4>
        <hr/>
          <p className='py-3'>{product?.description}</p>
        </div>
        <hr/>
        <div className="productImages">
          <h4 className='py-3'>Product Images</h4>

      <div className='grid gap-6 mb-1 md:grid-cols-2'>
      {product?.images?.map((img, index) => {
            return (
              <div key={index}>
                <img src={img?.url} alt={'product'}/>
              </div>
            );
          })}
      </div>

         
        </div>
        </div>
    </RenderHirePurchasePage>
  )
}

export default ProductDetailed