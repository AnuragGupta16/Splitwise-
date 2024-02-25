import React, { useState, useEffect } from 'react';
import { Link  ,useHistory} from 'react-router-dom';
import axios from 'axios';
import { getToken, removeToken } from '../../services/authService';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Card, CardContent, Grid, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  dashboardContainer: {
    padding: theme.spacing(3),
  },
  dashboardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  createGroupLink: {
    textDecoration: 'none',
    color: '#fff',
  },
  groupItem: {
    borderRadius: theme.spacing(2),
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },
  groupThumbnail: {
    width: '100%',
    height: 'auto',
    borderRadius: theme.spacing(2, 2, 0, 0),
  },
   groupName: {
    marginTop: theme.spacing(5),
    fontSize: '2.5rem',
    fontWeight: 'bold',
    alignItems: 'center'
  },
  noGroupsMessage: {
    marginTop: theme.spacing(2),
    fontSize: '1.1rem',
    color: '#888',
  },
  createButton: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(3),
    padding: theme.spacing(1.5, 5),
    fontSize: '1.1rem',
    fontWeight: 'bold',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const categoryImageMapping = {
  "Food": 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
  "Office": 'https://st3.depositphotos.com/8911320/33966/i/450/depositphotos_339665118-stock-photo-render-modern-office-interior.jpg',
  "Trip": 'https://www.kayak.co.uk/c/wp-content/uploads/sites/198/2021/04/GettyImages-641294046-e1617788010912.jpg',
  "Shopping": 'https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074075.jpg?size=626&ext=jpg&ga=GA1.1.1269040533.1708732800&semt=sph',
  "Other": 'https://beebom.com/wp-content/uploads/2017/02/best-app-locker-for-android-featured.jpg',
};

const Dashboard = () => {
  const classes = useStyles();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      history.push('/login'); // Redirect to login if token is not present
    } else {

      const fetchGroups = async () => {
        try {
          const response = await axios.get('/api/groups', {
            headers: {
              Authorization: `Bearer ${token}` // Add Authorization header with token
            }
          });
          setGroups(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching groups:', error);
          setLoading(false);
        }
      };

      fetchGroups();
    }
  }, [history]);


  const handleLogout = () => {
    removeToken();
     window.location.href = '/login';
    // Redirect to login page or any other desired page
  };

  return (
    <div className={classes.dashboardContainer}>
      <div className={classes.dashboardHeader}>
        <Typography variant="h4">Your Groups</Typography>
        <div>
          <Link to="/create-group" className={classes.createGroupLink}>
            <Button variant="contained" color="primary" className={classes.createButton}>Create Group</Button>
          </Link>
          <Button variant="contained" color="secondary" onClick={handleLogout} className={classes.createButton}>Logout</Button>
        </div>
      </div>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {groups.map(group => (
            <Grid item xs={12} sm={6} md={4} key={group._id}>
              <Link to={`/groups/${group._id}`} className={classes.groupLink}>
                <Card className={classes.groupItem}>
                  <img src={categoryImageMapping[group.category]} alt="Group Thumbnail" className={classes.groupThumbnail} />
                  <CardContent>
                    <Typography variant="h6" className={classes.groupName}>{group.name}</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
          {groups.length === 0 && (
            <Typography variant="body1" className={classes.noGroupsMessage}>No groups found. Create one to get started!</Typography>
          )}
        </Grid>
      )}
    </div>
  );
};

export default Dashboard;
