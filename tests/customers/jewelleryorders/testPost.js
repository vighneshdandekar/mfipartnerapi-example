let STAGE = process.env.mygold_stage ? process.env.mygold_stage : "dev";
const config = require("../../../config/credentials.json")[STAGE];
const DvaraGold = require("../../../cliient/dvaragold");
const extCustomerId = "AMITCST001";
const bullion = {
  bullionShortName: "G22K",
  bullionName: "Gold",
  purity: { displayValue: "22Kt - (91.6%)", value: "916" },
  status: "available",
  isBaseBullion: false,
  id: "G3",
};

const order = {
  agent: {
    extAgentId: "EXTAGT02",
    name: { first: "Koshi", middle: "Venkateshwara", last: "Shaikh" },
  },
  jewelleryItems: [
    {
      jewelleryId: "",
      quantity: 1,
      bullionRateId: "string",
    },
  ],
  paymentPlan: {
    "useBullionBalance": [
        {
            "bullion": bullion,
            "maxBullionWtGm": 1
        }
    ],
    alternatePaymentMode: "partnercollect",
  },
  jewelleryPaymentDetails: [
    {
      paymentTotalValueInr: 0,
      paymentDate: "2020-10-09T07:01:36.801Z",
      txnReference: "string",
      txnDetails: {
        neft_reference: "OC45rt456",
      },
      paymentInstrumentType: "NEFT",
    },
  ],
  extReferenceId: "EXTOrderID000010101",
  orderdetail: {
    scheme: "Diwali",
    discountcode: "dw0101"
  },
};

async function test() {
  let client = await DvaraGold.Client(config);
  let jewellery = await client.getProducts({}, extCustomerId);
  order.jewelleryItems[0].jewelleryId = jewellery[0].id;
  order.jewelleryItems[0].bullionRateId = jewellery[0].bullionRateId;
  order.paymentPlan.useBullionBalance[0].maxBullionWtGm = jewellery[0].weightInGm;
  return await client.jewelleryCreate(extCustomerId, order);
}
test()
  .then((result) => {
    console.dir(result);
  })
  .catch((err) => {
    console.error(JSON.stringify(err));
  })
  .finally(() => {
    process.exit(0);
  });
