import React, { createContext, useContext, useState } from 'react';

// 1. สร้าง Context Object
const QuestionContext = createContext();

// 2. สร้าง Hook ที่ใช้สำหรับเรียกใช้ Context ได้ง่ายขึ้น
export const useQuestionContext = () => {
    return useContext(QuestionContext);
};

// 3. สร้าง Provider Component เพื่อห่อหุ้ม App
export const QuestionProvider = ({ children }) => {
    // สถานะที่จะถูกแชร์: question, และฟังก์ชันสำหรับตั้งค่า
    const [todayQuestion, setTodayQuestion] = useState(null);

    return (
        <QuestionContext.Provider value={{ todayQuestion, setTodayQuestion }}>
            {children}
        </QuestionContext.Provider>
    );
};
