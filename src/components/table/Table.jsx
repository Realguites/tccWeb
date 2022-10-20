import './Table.css'
import { FaTrashAlt } from 'react-icons/fa';
import { GrUpdate } from "react-icons/gr";
import axios from 'axios';


const axiosConfig = {
    headers: {
        'Authorization': `bearer ${localStorage.getItem("sipToken")}`
    }
};

const toDefaultMoneyMask = (value) => {
    return value.toLocaleString('pt-br', {
      currency: 'BRL',
      style: 'currency',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

  }

function setStatus(h, idDisp, data) {
    axios.put('http://localhost:3001/smartphone/' + idDisp, JSON.parse('{"' + h.id + '":"' + data + '"}'), axiosConfig).then((response) => {
        if (response.status === 204) {
            alert("Usuário atualizado com sucesso!")
        }
    }).catch((e) => {
        alert(e?.message)
    })
 
}

const returnFormatedData = (data, type) =>{
    switch(type){
        default: return data
        case 'money':
            return toDefaultMoneyMask(toDefaultMoneyMask(data))
        case 'perCent':
            return data.toString() + "%"
        case 'date' :
            const date = new Date(data)
            if(date != 'Invalid Date')
                return date.toLocaleDateString() + " - " + date.toLocaleTimeString()
            else
                return '-'

            

    }
}

export default props => {
    return (
        <div class="table-wrapper">
            <table className="fl-table">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        {props?.keys?.map((h) => {
                            return <th>{h.label}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {props?.data?.map((line, index) => {
                        if(props.type === "pesquisaCliente"){
                            
                        }
                        return <tr>
                            
                                <td>
                                    <button onClick={
                                        function (e) {
                                            props.returnLineData('delete', line)
                                        }}>
                                        <FaTrashAlt />
                                    </button>
                                </td>
                                <td>
                                    <button onClick={
                                        function (e) {
                                            props.returnLineData('update', line)
                                        }}>
                                        <GrUpdate />
                                    </button>
                                </td>

                            {
                                props.keys.map((h) => {
                                    if (h.id === 'autCgm' || h.id === 'status') {
                                        return (<td><select name={h.id} id={h.id + '_' + line[h.id]} defaultValue={line[h.id]} onChange={async (e) => {
                                            const value = window.confirm(`Deseja alterar o status de ${line['usuario']} de ${line[h.id]} para ${!line[h.id]}?`)
                                            if (value) {
                                                setStatus(h.id, line['idDisp'], e?.target?.value)
                                            }
                                        }} >
                                            <option value="true">Ativo</option>
                                            <option value="false">Inativo</option>
                                        </select></td>
                                        )
                                    }
                                    if (h.id === 'versaoEstavel' || h.id === 'linkAtualizacao')
                                        return <td><input
                                            value={line[h.id]}
                                        ></input></td>

                                    return (<td>{returnFormatedData(line[h.id], h.type)}</td>)
                                })
                            }</tr>

                    })}

                </tbody>
            </table>
        </div>
    )
}