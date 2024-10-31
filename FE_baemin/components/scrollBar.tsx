'use client'

import { Carousel } from "antd";
import Image from "next/image";
import React from "react";


export default function ScrollBar({ items }: { items: any[] }) {

  return (
    <>
      <Carousel className="mb-[28px]" >
        {items.length && items.map((item, index) => (<>
          <div key={index} style={{ position: 'relative', height: '400px' }}>
            <Image
              fill
              src={item.url}
              alt="s"
            />
          </div>
        </>))}
      </Carousel>
    </>
  )


}