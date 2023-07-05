import {Button, Input, Layout} from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import {
    Chart as ChartJS,    CategoryScale,    LinearScale,    BarElement,    Title,    Tooltip,    Legend, ArcElement
  } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import './homepage.css';
import { useEffect, useState } from 'react';

ChartJS.register( CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);
ChartJS.register(ArcElement);

const Home = (props) => {
    //here, v means volunteers
    const [n_v, set_v] = useState([9,1]);
    const [chartMembers, setChartMembers] = useState([5, 10, 20]);
    const [n_w, set_w] = useState([25, 6]);
    const [n_l, set_l] = useState([25, 6]);

    const [star_p, set_star_p] = useState({
        name: 'Vaibhav Sharma',
        org: 'Some organization'        
    })

    const [org_chart, set_org_chart] = useState({
        labels: ['Hello', 'World', 'a'],
        data: [233, 200, 122]
    })
    const chart_options = {
        responsive: true,
        legend: {
            display: false,
        },
        plugins: {
            legend: {
                display: false
            }
        },
    };

    const labels = ['Volunteers', 'Coordinators', 'Admins'];
    const chart_data = {
        labels,
    datasets: [{
        data: chartMembers,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }],
    }
    
    const pie_chart_data = {
        labels: org_chart.labels,
        datasets: [{
            label: '',
            data: org_chart.data,
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)','rgb(255, 205, 86)', 'rgba(255, 159, 64, 1)']
        }]
        
    }

    const [announcementList, setAnnouncementList] = useState(); 
    const [posts, setPosts] = useState([]);

    const list = [
        {
            "title": "My Meeting",
            "description" : "Here is some description of announcement.",
            "date": "11 July 2022"
        },
        {
            "title": "My Meeting",
            "description" : "Here is some description of announcement.",
            "date": "11 July 2022"
        },
        {
            "title": "My Meeting",
            "description" : "Here is some description of announcement.",
            "date": "11 July 2022"
        }
    ]

    const list2 = [
        {
            'name': "Something Verma",
            "postTitle": "Some Title",
            "postDescription": "Some Desc........................asdassd adas dasjhd hasdj assdj kahjkdashj kdas hjkdhjkas dasd asd jhasdhjkda sdhjkasjhd kashjk dashjskda hjk"
        }
    ]
    
    useEffect(() => {
        setAnnouncementList(list.map((item) => {
            return (<div className='announcement'>
                <div className="head">
                    <div className="title">{item["title"]}</div>
                    <div className="date">{item["date"]} </div>
                </div>
                <div className="description">{item["description"]}</div>
                
            </div>)
        }))
        setPosts(list2.map((item) => {
            return (
                <div style={{maxWidth: '400px'}} className='post'>
                    <div className="name" style={{marginBottom: '2px'}}>posted by: <span>{item["name"]}</span></div>
                    <div className="title" style={{fontWeight: 'bold', fontSize: '20px', marginBottom: '8px', color: 'rgb(22, 119, 255)'}}> {item["postTitle"]} </div>
                    <div className="description" style={{marginBottom: '8px'}}> {item["postDescription"]} </div>
                </div>
            )
        }))
    }, [])
       
    
    
    return (
        <div className="homeContainer">
            <Layout>
                <Header style={{background: '#7cb8f8', boxShadow: '0 0 18px -5px'}}>Empty for now</Header>
            </Layout>
            <Content style={{width: '100%'}}>
            
            <div className="contentTopContainer" style={{width: '100%'}}>
                <div className="card">
                    <div className="upper">
                        Number of Participants
                    </div>
                    <div className="lower">
                        <div style={{fontSize: '16px'}}>Total in last 7 days: {n_v[0]}</div>
                        <div style={{color: `${n_v[1] >= 0 ? 'green' : 'red'}`}}>{n_v[1] >= 0 ? '+' : ''} {n_v[1]} v/s last week</div>
                    </div>
                </div>
                <div className="card">
                    <div className="upper">
                        Number of Members
                    </div>
                    <div className="lower">
                        <Bar options={chart_options} data={chart_data} />
                    </div>
                </div>
                <div className="card">
                    <div className="upper">
                        Number of Work Hours
                    </div>
                    <div className="lower">
                        <div style={{fontSize: '16px'}}>Total in last 7 days: {n_w[0]}</div>
                        <div style={{color: `${n_w[1] >= 0 ? 'green' : 'red'}`}}>{n_w[1] >= 0 ? '+' : ''} {n_w[1]} v/s last week</div>
                    </div>
                </div>
                <div className="card">
                    <div className="upper">
                        Number of Lives impacted
                    </div>
                    <div className="lower">
                    <div style={{fontSize: '16px'}}>Total in last 7 days: {n_l[0]}</div>
                        <div style={{color: `${n_l[1] >= 0 ? 'green' : 'red'}`}}>{n_l[1] >= 0 ? '+' : ''} {n_l[1]} v/s last week</div>
                    </div>
                </div>
                <div className="card">
                    <div className="upper">
                        Participants in Orgranizations
                    </div>
                    <div className="lower" style={{maxHeight: '250px', textAlign: 'center'}}><Pie style={{alignSelf: 'center'}} data={pie_chart_data} /></div>
                </div>
                <div className="card">
                    <div className="upper">
                        Star Performer
                    </div>
                    <div className="lower">
                        <div style={{fontWeight: 'bold', fontSize: '18px', }}>{star_p.name}</div>
                        <div> <span style={{color: 'grey'}}>works at:</span><br /> {star_p.org}</div>
                    </div>
                </div>
            </div>   
            <div className="contentBottomContainer" style={{textAlign: 'left'}}>
                <div className="announcements">
                    <div style={{fontSize: '22px', fontWeight: 'bold', paddingBottom: '8px'}}>Announcements</div>
                    {announcementList}
                </div> 
                <div className="postsContainer">
                    <div className="poster">
                        <div className="upper">
                            Create Post
                        </div>
                        <div className="lower">
                            <Input placeholder='Title' className='posterInput'/>
                            <Input.TextArea placeholder='Description'className='posterInput' rows={3}/>
                            <Button type='primary'>Submit</Button>
                        </div>
                    </div>
                    <div className="posts">
                        <div className="upper" style={{marginLeft: '-16px'}}>Posts</div>
                        {posts}
                    </div>
                </div>
            </div>             
            </Content>
        </div>
    )
}

export default Home;