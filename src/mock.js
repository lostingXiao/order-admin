import router from './router'

const formatMenuItems=v=>{
  const showItems = v.filter(item=>!item.hide)
  const items=showItems.map((item,index)=>{
    const children=item.children?item.children.filter(v=>!v.hide):[]
    return {
      key:item.path, 
      icon:item.icon,
      label:item.title,
      children:children.length&&formatMenuItems(children)
    }
  })
  return items
}

const menuItems=formatMenuItems(router.routes.find(item=>item.path==='/').children)

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'leaf',
        key: '0-0-0',
      },
      {
        title: 'leaf',
        key: '0-0-1',
      },
    ],
  },
];

const dataSource = [
  { key: '1', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号'},
  { key: '2', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号'},
  { key: '3', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号'},
  { key: '4', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号'},
  { key: '5', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号'},
];
const columns = [
  { title: '姓名',dataIndex: 'name',key: 'name',},
  { title: '年龄', dataIndex: 'age', key: 'age',},
  { title: '住址', dataIndex: 'address', key: 'address',},
];

const searchData=[
  { key:'ccc',type:'input',placeholder:'qqqq',label:'字段名',rules:[{required: true,message: 'Input something!'}] },
  { key:'vvv',type:'input',placeholder:'qqqq',label:'字段名',rules:[{required: true,message: 'Input something!'}] },
  { key:'qq',type:'input',placeholder:'qqqq',label:'字段名',rules:[{required: true,message: 'Input something!'}] },
  { key:'ww',type:'input',placeholder:'qqqq',label:'字段名',rules:[{required: true,message: 'Input something!'}] },
  { key:'bbb',type:'select',placeholder:'select',label:'select',rules:[{required: true,message: 'select something!'}],options:[
    { value:'111',label:'111' },
    { value:'222',label:'222' },
    { value:'333',label:'333' },
    { value:'444',label:'444' },
    { value:'555',label:'555' },
  { value:'666',label:'666' },
  ] }
]


const options = [
  {
    label: 'Light',
    value: 'light',
    children: new Array(20).fill(null).map((_, index) => ({
      label: `Number ${index}`,
      value: index,
    })),
  },
  {
    label: 'Bamboo',
    value: 'bamboo',
    children: [
      {
        label: 'Little',
        value: 'little',
        children: [
          {
            label: 'Toy Fish',
            value: 'fish',
          },
          {
            label: 'Toy Cards',
            value: 'cards',
          },
          {
            label: 'Toy Bird',
            value: 'bird',
          },
        ],
      },
    ],
  },
]

const seloptions=[
  {
    value: 'jack',
    label: 'Jack',
  },
  {
    value: 'lucy',
    label: 'Lucy',
  },
  {
    value: 'Yiminghe',
    label: 'yiminghe',
  },
  {
    value: 'disabled',
    label: 'Disabled',
    disabled: true,
  },
]

export  {
  menuItems,
  treeData,
  options,seloptions,
  dataSource,
columns,
searchData
}