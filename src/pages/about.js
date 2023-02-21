const about = {
  type: "crud",
  api: "/api/usersList",
  syncLocation: false,
  columns: [
    {
      name: "key",
      label: "ID"
    },
    {
      name: "name",
      label: "名称"
    },
    {
      name: "age",
      label: "岁数"
    },
    {
      name: "address",
      label: "地区"
    },
  ]
}

export default about;