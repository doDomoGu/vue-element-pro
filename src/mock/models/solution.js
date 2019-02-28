let data = []

const data_one = {
  id: 30001,
  name: '投放2019',
  enable : 1,
  p_id: 20001
}

const order_num = 1000

const solution_num = 5000

for(let i = 0; i < solution_num ;i++){
  data.push(
    {
      id :data_one.id + i - 1,
      name: data_one.name + ( i >0 ? '-'+i : ''),
      enable : 1,
      p_id: data_one.p_id + (parseInt(Math.random()*( order_num +1)+0,10))
    }
  )
}
export default data 