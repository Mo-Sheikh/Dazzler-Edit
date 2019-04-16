import React, { Fragment } from 'react';
import moment from 'moment';
import Arrow from '@material-ui/icons/ArrowRightAlt';


class SingleSchedule extends React.Component {

        timeFormat(){
           
        if(moment.duration(this.props.duration)._data.seconds.toString().length === 1){
            return "0" + (moment.duration(this.props.duration)._data.seconds)
          } else {
            return (moment.duration(this.props.duration)._data.seconds)
          }

}
        render() {
          var chosen ='';
           if(this.props.prev === 1){
               var additional = null;
           }else {
             
             additional = 
            <td><button className="Add" onClick={() => this.props.deleteItem(this.props.startTime)}>Delete</button> 
           </td>;
           }

          
             
           
    return (
        <Fragment>
          
            <tr className = {this.props.style}>

            <td></td>
           <td className="collapsing">
          
           <input type="checkbox"/> <label></label>
          
           </td>
           <td>{this.props.startTime}</td>
           <td>{this.props.title}</td>
           <td>{moment.duration(this.props.duration)._data.minutes}:{this.timeFormat()}</td>
           {additional}
            
       </tr>
        </Fragment>
    );
}
}
export default SingleSchedule;





         

