import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

class Friends extends React.Component {
    state = {
      friends: [],
      newFriend: {
          name: '',
          age: '',
          email: '',
      }
    };
  
    componentDidMount() {
      this.getData();
    }
  
    getData = () => {
      axiosWithAuth().get('/friends')
        .then (res => {
          this.setState({
            friends: res.data
          })
        })
        .catch (err => {
          console.log(err.response)
        })
    };

    handleChange = e => {
        this.setState({
          newFriend: {
              ...this.state.newFriend,
            [e.target.name]: e.target.value
          }
        });
      };
    
      addFriend = e => {
        e.preventDefault();
     
        axiosWithAuth()
        .post("http://localhost:5000/api/friends", this.state.newFriend)
          .then( res => {
            //add news data to friends data state
            this.setState({
                ...this.state.friends,
                friends: res.data
            })
          })
          .catch( err => {
            console.log('error: ', err.data)
          })
          //reset input values
          this.setState({
            newFriend: {
                name: '',
                age: '',
                email: '',
            }
          });
      };

      deleteFriend = e => {
        e.preventDefault();

        axiosWithAuth()
        .delete(`http://localhost:5000/api/friends/${e.target.id}`)
          .then( res => {
            console.log(res)
          })
          .catch( err => {
            console.log('error: ', err.data)
          })

      }
  
    
  
    render() {
    
    console.log('friends state', this.state)
      return (
        <div className="friends">
            <div>
                <form onSubmit={this.addFriend} >
                    <input
                        type="text"
                        name="name"
                        placeholder='Name'
                        value={this.state.newFriend.name}
                        onChange={this.handleChange}
                    />
                    <input
                        type="number" 
                        name="age"
                        placeholder='Age'
                        value={this.state.newFriend.age}
                        onChange={this.handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder='Email'
                        value={this.state.newFriend.email}
                        onChange={this.handleChange}
                    />
                <button>Add Friend</button>
             </form>
            </div>

            <h1>Friends</h1>
            {
                this.state.friends.map(friend => (
                    <div className='friend' key={friend.id}>
                        <h2>{friend.name}</h2>
                        <h3>Age: {friend.age}</h3>
                        <h3>{friend.email}</h3>
                        <button onClick={
                            (e) => {
                                e.preventDefault();

                                    axiosWithAuth()
                                    .delete(`http://localhost:5000/api/friends/${friend.id}`)
                                    .then( res => {
                                        console.log(res)
                                        this.setState({
                                            ...this.state.friends,
                                            friends: res.data
                                        })
                                    })
                                    .catch( err => {
                                        console.log('error: ', err.data)
                                    })
                            }
                        }>Delete</button>
                    </div>
                ))
            }
          
        </div>
      );
    }
  }
  
  export default Friends;
  