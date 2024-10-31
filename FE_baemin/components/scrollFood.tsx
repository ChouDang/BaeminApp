'use client'
import { API_URL } from "@/apis/axiosConfig";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ScrollBar({ items }: { items: Restaurant[] }) {
    const router = useRouter();
    const handleNavigate = (id: string) => router.push('/detailfood/' + id);

    return (
        <>
            <div className=" bg-white rounded-2xl w-full   " style={{}}>
                <div className="w-full h-[300px] flex flex-col px-4 pt-4 pb-2  overflow-y-hidden overflow-y-auto scroll-smooth " style={{}}>
                    <div>
                        <div className="w-full h-full flex  from-transparent via-gray-100 to-gray-300 gap-4">
                            {items.length ? items.map(item => {
                                return <div className="group flex flex-col w-[200px] gap-x-2 border-solid border-2  border-beamin-50"
                                    onClick={() => handleNavigate(item.id)}
                                >
                                    <div className="ml-3 text-xl font-bold mb-2 truncate">  {item.name} </div>
                                    <div className="w-[200px] h-[150px] relative overflow-hidden" >
                                        <Image
                                            src={API_URL + "/public" + item.img.split('public')[1]}
                                            alt={""}
                                            fill
                                            className="object-contain group-hover:scale-105 transform transition-transform duration-300 ease-out"
                                        />
                                    </div>
                                    <div className=" w-full h-1/3  flex flex-col pl-2 pr-2 border-solid border-2  border-beamin-50">
                                        <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap line-clamp-2 text-base ">
                                            <span  > {item.name} </span>
                                        </div>
                                        <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap line-clamp-2 text-sm " style={{ color: '#959595' }}>
                                            <span> {item.address}</span>
                                        </div>
                                    </div>
                                </div>
                            }) : <></>}

                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}