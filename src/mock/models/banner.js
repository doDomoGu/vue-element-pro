let data = []

const data_one = {
  id: 40001,
  name: '创意2019',
  enable : 1,
  p_id: 30001
}

const solution_num = 5000

const banner_num = 80000

for(let i = 0; i < banner_num ;i++){
  data.push(
    {
      id :data_one.id + i - 1,
      name: data_one.name + ( i >0 ? '-'+i : ''),
      enable : 1,
      p_id: data_one.p_id + (parseInt(Math.random()*( solution_num +1)+0,10))
    }
  )
}
export default data 