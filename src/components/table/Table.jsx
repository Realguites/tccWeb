import './Table.css'
import { FaTrashAlt } from 'react-icons/fa';
import { GrUpdate } from "react-icons/gr";


const refresh = (id) => {
    //e.stopPropagation(); 
    console.log('TESTEEEEE ', id)
    alert('batata')
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
                                        props.returnLineData('delete', line?.id)
                                    }}>
                                    <FaTrashAlt />
                                </button>
                            </td>
                            <td>
                                <button onClick={
                                    function (e) {
                                        props.returnLineData('update',line?.id)
                                    }}>
                                    <GrUpdate />
                                </button>
                            </td>
                            {
                                props.keys.map((h) => {
                                    if (h === 'autCgm' || h === 'status') {
                                        return (<td><select name={h} id={h + '_' + line[h]} defaultValue={line[h]} >
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