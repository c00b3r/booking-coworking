import { Icon16SearchOutline } from "@vkontakte/icons";
import {
  DateInput,
  Flex,
  FormItem,
  Input,
  Pagination,
  Select,
} from "@vkontakte/vkui";
import "./HistoryPage.css";
import { useEffect, useState } from "react";
import Table from "../../component/Table/Table";
import { Bookings } from "../../types/interface";

export default function HistoryPage() {
  const [serach, setSearch] = useState("");
  const [type, selecType] = useState("open-space");
  const [number, setNumber] = useState(0);
  const [date, setDate] = useState<Date | undefined>(() => new Date());
  const [booking, setBooking] = useState<Bookings[]>([]);

  useEffect(() => {
    async function getBookings() {
      try {
        const response = await fetch("http://localhost:5000/bookings");
        const data = await response.json();
        if (response.ok) {
          setBooking(data);
        }
      } catch (error: Error | unknown) {
        console.error("Error fetching bookings:", error);
      }
    }

    getBookings();
  }, []);

  return (
    <div className='history'>
      <div className='history__container'>
        <h4>История</h4>
        <Flex style={{ display: "flex", gap: "16px" }}>
          <FormItem noPadding>
            <Input
              before={<Icon16SearchOutline />}
              style={{ width: "283px" }}
              value={serach}
              onChange={(e) => setSearch(e.target.value)}
            ></Input>
          </FormItem>
          <FormItem noPadding>
            <Select
              placeholder='Тип'
              value={type}
              onChange={(e) => selecType(e.target.value)}
              options={[]}
              style={{ width: "283px" }}
            />
          </FormItem>
          <FormItem noPadding>
            {" "}
            <Select
              placeholder='Номер комнаты'
              options={[]}
              style={{ width: "283px" }}
              value={number}
              onChange={(e) => setNumber(Number(e.target.value))}
            />
          </FormItem>
          <FormItem noPadding>
            <DateInput
              style={{ width: "283px" }}
              value={date}
              onChange={(newDate) => setDate(newDate)}
            />
          </FormItem>
        </Flex>
        <Table bookings={booking} />
        <Pagination style={{ alignSelf: "center" }} />
      </div>
    </div>
  );
}
