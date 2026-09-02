import type { Language } from "./menu-content";

export type NoticeSection = {
  title: string;
  paragraphs: readonly string[];
  subheading?: string;
  items?: readonly string[];
  note?: string;
};

export const guestNoticeContent: Record<Language, readonly NoticeSection[]> = {
  ja: [
    {
      title: "ご来店時のお願い",
      paragraphs: [
        "ご予約当日、お帰りの時間に制限がある場合（飛行機などの交通機関をご利用の場合を含む）は、事前に店舗までお問い合わせくださいますようお願いいたします。",
        "当日または直前にお申し出いただいた場合、ご希望に添えない場合がございますので、あらかじめご了承ください。",
        "ご予約時間より **30分以上遅れてご来店される場合**、ご到着時点からお料理のご提供を開始いたします。",
        "また、コースの途中でご退店される場合、コースの一部をご提供できない可能性がございますので、あらかじめご了承ください。",
      ],
    },
    {
      title: "キャンセルについて",
      paragraphs: ["ご予約をキャンセルされる場合、以下の通りキャンセル料を申し受けます。"],
      subheading: "■ ご予約取消時",
      items: ["ご予約日前日 00:00以降：**50％**", "当日キャンセル（ご連絡あり）：**100％**", "当日キャンセル（ご連絡なし）：**100％**"],
      note: "※ ご予約いただいたプランに別途キャンセルポリシーが記載されている場合は、プラン内のキャンセルポリシーが優先されます。",
    },
    {
      title: "ご予約方法について",
      paragraphs: ["当サイトよりご案内している **一休レストラン**、または店舗への直接のお問い合わせにてご予約ください。"],
    },
    {
      title: "お支払いについて",
      paragraphs: ["**会計方法：** テーブル会計 / レジ会計", "**クレジットカード：** VISA / Master / JCB / AMEX / Diners / UnionPay", "**QRコード決済：** PayPay"],
    },
  ],
  en: [
    {
      title: "Before your visit",
      paragraphs: [
        "If you have a fixed departure time on the day of your reservation, including a flight or other transport connection, please contact the restaurant in advance.",
        "We may be unable to accommodate requests made on the day or at short notice. Thank you for your understanding.",
        "If you arrive **30 minutes or more after your reservation time**, we will begin serving your meal when you arrive.",
        "If you leave before the course is complete, we may be unable to serve some of the dishes. Thank you for your understanding.",
      ],
    },
    {
      title: "Cancellations",
      paragraphs: ["The following cancellation fees apply when cancelling a reservation."],
      subheading: "■ Reservation cancellation",
      items: ["From 00:00 on the day before your reservation: **50%**", "Same-day cancellation (with notice): **100%**", "Same-day cancellation (without notice): **100%**"],
      note: "If your booked plan specifies a separate cancellation policy, the policy stated in that plan takes precedence.",
    },
    {
      title: "How to reserve",
      paragraphs: ["Please book through **Ikyu Restaurant**, linked from this website, or contact the restaurant directly."],
    },
    {
      title: "Payment",
      paragraphs: ["**Payment location:** At your table / At the register", "**Credit cards:** VISA / Master / JCB / AMEX / Diners / UnionPay", "**QR code payment:** PayPay"],
    },
  ],
  zh: [
    {
      title: "到店须知",
      paragraphs: [
        "如预约当天的离店时间有限制（包括需要搭乘飞机等交通工具的情况），请提前联系餐厅。",
        "若在当天或临近到店时提出，我们可能无法满足您的要求，敬请谅解。",
        "如您在预约时间后 **迟到30分钟及以上** 到店，我们将从您抵达时开始提供料理。",
        "此外，如您在套餐用餐途中离店，部分菜品可能无法提供，敬请谅解。",
      ],
    },
    {
      title: "取消预约",
      paragraphs: ["如需取消预约，将按以下标准收取取消费用。"],
      subheading: "■ 取消预约时",
      items: ["预约日前一天00:00起：**50％**", "当日取消（已联系餐厅）：**100％**", "当日取消（未联系餐厅）：**100％**"],
      note: "※ 如您预订的套餐另有取消政策，则以该套餐内所载的取消政策为准。",
    },
    {
      title: "预约方式",
      paragraphs: ["请通过本网站提供的 **一休餐厅** 链接预约，或直接联系餐厅。"],
    },
    {
      title: "支付方式",
      paragraphs: ["**结账方式：** 餐桌结账 / 收银台结账", "**信用卡：** VISA / Master / JCB / AMEX / Diners / UnionPay", "**二维码支付：** PayPay"],
    },
  ],
};
