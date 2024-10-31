'use client'
import ScrollBar from "@/components/scrollBar";
import ScrollFood from "@/components/scrollFood";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useApiRestaurants from "../api/useApiRestaurants";
import useApiCatory from "../api/useApiCatory";

const banneritems = [
    {
        id: '1',
        name: 'anh 1',
        url: '/images/map1.png',
    },
    {
        id: '2',
        name: 'anh 2',
        url: '/images/map2.png',
    },
    {
        id: '3',
        name: 'anh 32',
        url: '/images/map3.png',
    },
    {
        id: '3',
        name: 'anh 32',
        url: '/images/map4.png',
    }
]

export default function Home() {

    const router = useRouter()
    const { getAllRestaurants } = useApiRestaurants()
    const { getAllCategory } = useApiCatory()
    const [items, set_items] = useState<Category[]>([])
    const [restaurant, set_restaurant] = useState<Restaurant[]>([])

    useEffect(() => {
        function onInit() {
            if (!restaurant.length) {
                let checkStoreLocal = localStorage.getItem("allRestaurants")
                if (!!checkStoreLocal) {
                    set_restaurant(JSON.parse(checkStoreLocal))
                } else {
                    getAllRestaurants().then(resp => resp && Array.isArray(resp.data) && resp.data.length
                        && set_restaurant(resp.data)
                    ).catch(err => console.log(err))
                }
            }

            if (!items.length) {
                let checkStoreLocal = localStorage.getItem("allCategory")
                if (!!checkStoreLocal) {
                    set_items(JSON.parse(checkStoreLocal))
                } else {
                    getAllCategory().then(resp => resp && Array.isArray(resp.data) && resp.data.length
                        && set_items(resp.data)
                    ).catch(err => console.log(err))
                }
            }
        }
        onInit()
    }, [])

    return (
        <>
            <Row justify={"space-between"} className="p-4">
                <Col span={4}>
                    <div className="flex flex-col fixed  bg-white w-64 rounded-2xl  pl-3 pt-2  pb-5 gap-3 " style={{ width: 200 }}>
                        <span>Thực đơn </span>
                        {Array.isArray(items) && items.length ? items?.map((item, index) => (
                            <div key={index} className="flex flex-col gap-3 cursor-pointer hover:bg-slate-100" onClick={() => router.push('/category' + "/" + item.id)}>
                                <div className="flex flex-row items-center gap-1">
                                    <span>{item.name}</span>
                                </div>
                            </div>
                        ))
                            : <></>}
                    </div>
                </Col>

                <Col span={20} className="m-t-[82px]" >
                    <ScrollBar items={banneritems} ></ScrollBar>
                    <ScrollFood items={restaurant}></ScrollFood>
                </Col>

            </Row>

        </>
    )
}