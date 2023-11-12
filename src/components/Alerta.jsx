
export default function Alerta({alerta}) {
  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-primary-100 to-primary-200'} bg-gradient-to-br text-center p-3 rounded-xl text-white font-bold text-sm my-2`}>{alerta.msg}</div>
  )
}
