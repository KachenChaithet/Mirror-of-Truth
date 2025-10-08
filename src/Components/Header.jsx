import { useEffect, useState } from "react";

const Header = () => {
    const texts = [
        { text: '"อย่าหยุดเรียนรู้"', by: 'Albert Einstein' },
        { text: '"ความพยายามอยู่ที่ไหน ความสำเร็จอยู่ที่นั่น"', by: 'Unknown' },
        { text: '"ชีวิตคือการเดินทาง ไม่ใช่ปลายทาง"', by: 'Ralph Waldo Emerson' },
        { text: '"ความล้มเหลวคือก้าวแรกสู่ความสำเร็จ"', by: 'Winston Churchill' },
        { text: '"จงเชื่อในตัวเอง"', by: 'Norman Vincent Peale' },
        { text: '"โอกาสไม่มาหาเรา เราต้องสร้างมันเอง"', by: 'Chris Grosser' },
        { text: '"จงใช้ชีวิตให้คุ้มค่าในทุกวัน"', by: 'Steve Jobs' },
        { text: '"ความคิดบวกนำมาซึ่งผลลัพธ์ที่ดี"', by: 'Unknown' }
    ];
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false); // เริ่ม fade out
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % texts.length);
                setFade(true); // fade in ข้อความใหม่
            }, 500); // ความยาว fade
        }, 5000); // เปลี่ยนข้อความทุก 2 วินาที

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full flex items-center flex-col gap-4">
            <div className="flex flex-col gap-2 items-center">
                <h1 className="text-[#e6d5f7] font-medium text-6xl">Mirror of Truth</h1>
                <p className="text-[#b1a4c1] font-semibold">A space for authentic self-reflection and honest introspection</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <h1
                    className={`mt-4 text-center transition-opacity text-[#b1a4c1] text-3xl md:text-2xl duration-500 ${fade ? "opacity-100" : "opacity-0"
                        }`}
                >
                    {texts[index].text}
                </h1>
                <h2
                    className="mt-4 text-center text-[#b1a4c1] text-xl"
                >
                    - {texts[index].by}
                </h2>
            </div>

        </div>
    )
}
export default Header