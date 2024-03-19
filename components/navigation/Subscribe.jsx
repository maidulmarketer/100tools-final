"use client";

import { useState } from "react";
import Modal from "../modal/Modal";

export default function Subscribe() {
  const [openSubscribe, setOpenSubscribe] = useState(false);
  return (
    <div className="hidden md:block">
      <div
        className="text-sm font-semibold cursor-pointer"
        onClick={() => setOpenSubscribe(true)}
      >
        Subscribe
      </div>

      <Modal show={openSubscribe} onClose={setOpenSubscribe}>
        hELLO THIS IS SUBSCRIBTIONS
      </Modal>
    </div>
  );
}
