let data = []

const data_one = {
  id: 20001,
  name: '订单2019',
  enable : 1,
  p_id: 10001
}

const campaign_num = 100

const order_num = 1000

for(let i = 0; i < order_num ;i++){
  data.push(
    {
      id :data_one.id + i ,
      name: data_one.name +( i>0 ? '-'+i : ''),
      enable : 1,
      p_id: data_one.p_id + (parseInt(Math.random()*( campaign_num +1)+0,10))
    }
  )
}
export default data 