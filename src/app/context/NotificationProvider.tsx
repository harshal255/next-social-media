"use client";

import { AnimatePresence } from "framer-motion";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Notification from "../components/Notification";



type NotificationType = "success" | "error" | "info" | "warning";

interface Notification {
    id: any,
    text: string,
    typed: NotificationType
}
interface NotificationContextType {
    notifications: Notification[],
    setNotification: (notification: string, typed: NotificationType) => void;
    removeNotif: (id: any) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>({
    notifications: [
        {
            id: 1,
            text: "To Do message",
            typed: "success"
        }
    ],
    setNotification: (notification, typed) => { },
    removeNotif: (id) => { },
});

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const setNotification = (notification: string, typed: NotificationType) => {
        const newNotification: Notification = {
            id: Date.now(),
            text: notification,
            typed: typed
        }
        setNotifications((prev) => [...prev, newNotification]);
    }
    const removeNotif = (id: any) => {
        console.log("remove")
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };


    return (
        <NotificationContext.Provider value={{ notifications, setNotification, removeNotif }}>
            {children}
            <div className="flex flex-col gap-1 w-72 fixed top-2 right-2 z-50 pointer-events-none">
                <AnimatePresence>
                    {notifications.map((ele) => (
                        <Notification removeNotif={removeNotif} {...ele} key={ele.id} />
                    ))}
                </AnimatePresence>
            </div>
        </NotificationContext.Provider>
    );
}


export function useNotification() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error(
            "useNotification must be used within a NotificationProvider"
        );
    }
    return context;
}