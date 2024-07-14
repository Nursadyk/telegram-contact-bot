"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import scss from "./TelegramBot.module.scss";
import axios from "axios";
interface Itelegram {
  userName: string;
  email: string;
  subject: string;
  description: string;
}
const TOKEN = process.env.NEXT_PUBLIC_TG_TOKEN;
const CHAT_ID = process.env.NEXT_PUBLIC_TG_ID;
const TelegramBot = () => {
  const { register, handleSubmit } = useForm<Itelegram>();
  const messageModel = (data: Itelegram) => {
    let messageTg = `UserName: <b>${data.userName} </b>\n`;
    messageTg += `Email Address: <b> ${data.email}</b>\n`;
    messageTg += `Subject:  <b>${data.subject}</b>\n`;
    messageTg += `Description:  <b>${data.description}</b>\n`;
    return messageTg;
  };
  const onsubmit: SubmitHandler<Itelegram> = async (data) => {
    const message = messageModel(data);
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      parse_mode: "html",
      text: message,
    });
  };

  return (
    <div className={scss.TelegramBot}>
      <div className="container">
        <div className={scss.content}>
          <form onSubmit={handleSubmit(onsubmit)}>
            <input
              placeholder="userName"
              type="text"
              {...register("userName", { required: true })}
            />
            <input
              placeholder="email"
              type="text"
              {...register("email", { required: true })}
            />
            <input
              placeholder="subject"
              type="text"
              {...register("subject", { required: true })}
            />
            <input
              placeholder="description"
              type="text"
              {...register("description", { required: true })}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TelegramBot;
