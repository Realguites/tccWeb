import './Table.css'
import { FaTrashAlt } from 'react-icons/fa';
import { GrUpdate } from "react-icons/gr";
import axios from 'axios';


const axiosConfig = {
    headers: {
        'Authorization': `bearer ${localStorage.getItem("sipToken")}`
    }
};


function setStatus(h, idDisp, data) {
    axios.put('http://localhost:3001/smartphone/' + idDisp, JSON.parse('{"' + h + '":"' + data + '"}'), axiosConfig).then((response) => {
        if (response.status === 204) {
            alert("Usuário atualizado com sucesso!")
        }
    }).catch((e) => {
        alert(e?.message)
    })
 
}

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {
    return (
        <div class="table-wrapper">
            <table className="fl-table">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        {props?.keys?.map((h) => {
                            return <th>{h}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {props?.data?.map((line, index) => {
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
                                    if (h === 'autCgm' || h === 'status') {
                                        return (<td><select name={h} id={h + '_' + line[h]} defaultValue={line[h]} onChange={async (e) => {
                                            const value = window.confirm(`Deseja alterar o status de ${line['usuario']} de ${line[h]} para ${!line[h]}?`)
                                            if (value) {
                                                setStatus(h, line['idDisp'], e?.target?.value)
                                            }
                                        }} >
                                            <option value="true">Ativo</option>
                                            <option value="false">Inativo</option>
                                        </select></td>
                                        )
                                    }
                                    if (h === 'versaoEstavel' || h === 'linkAtualizacao')
                                        return <td><input
                                            value={line[h]}
                                        ></input></td>

                                    return (<td>{line[h]}</td>)
                                })
                            }</tr>

                    })}

                </tbody>
            </table>
        </div>
    )
}