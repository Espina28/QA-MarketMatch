import Navbar from '../components/Navbar'
import Container from '@mui/material/Container'
import SideBar from '../components/SideBar'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import '../App.css' /*<---- custom css*/
import axios from 'axios'
import {useState, useEffect} from 'react'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function Transactions() {

        const [openComplete, setOpenComplete] = useState(false);
        const [openCancel, setCancel] = useState(false);

        const [deleteItem, setDeleteItem] = useState(null);

        const [transactions, setTransactions] = useState(null)

        //Complete
        const openCompleteDialog = (buyIdId) => {
            console.log("opening!! ", buyIdId)

            setDeleteItem(buyIdId)
            setOpenComplete(true);
        };

        const closeCompleteDialog = () => {
            console.log("closing")
            setOpenComplete(false);
        };
        const completeDialogQuery = () => {

            //query axios here
            console.log('Querying!!')

            // axios.delete(`http://localhost:8080/api/buy/delete/${deleteItem}`)
            // .then(response => {
            //     console.log('Item deleted successfully:', response.data);
            //     const newTransactions = transactions.filter((transactions)=>transactions.buyIdId ===  deleteItem)
            //     setTransactions(newTransactions)
            //     setDeleteItem(null)
            // })
            // .catch(error => {
            //     console.error('Error deleting item:', error);
            // });
            const newTransactions = transactions.filter((transactions)=>transactions.buyIdId !==  deleteItem)
            setTransactions(newTransactions)
            setDeleteItem(null)
            setOpenComplete(false);
        };


        
        //Cancel
        const openCancelDialog = (buyIdId) => {
            console.log("opening!!")
            setDeleteItem(buyIdId)
            setCancel(true);
        };

        const closeCancelDialog = () => {
            console.log("closing")
            setCancel(false);
        };
        const cancelDialogQuery = () => {

            //query axios here
            console.log('Querying!!')

            // axios.delete('http://localhost:8080/api/seller/transactions',{
            //     params: {

            //     }
            // })
            const newTransactions = transactions.filter((transactions)=>transactions.buyIdId !==  deleteItem)
            setTransactions(newTransactions)
            setDeleteItem(null)
            setCancel(false);
        };


      useEffect(()=>{
        axios.get("http://localhost:8080/api/seller/transactions",{
            params: {
                email: "espina@cit.edu" // Send email as query parameter
            },
            auth: {
                username: "espina@cit.edu",
                password: "12345"
            }
        }).then((response)=>{
            console.log(response)
            setTransactions(response.data)
        })

      },[])

    return (
        <Container maxWidth={false} disableGutters sx={{ height: '100vh' }}>
            <Grid container sx={{ paddingTop: 1, paddingBottom: 1 }}>
                <Navbar />
            </Grid>
            <Grid container direction="row" spacing={3} wrap="nowrap" sx={{ height: '100%' }} className="padding-color-outer">
                <Grid size={{md: 3}}>
                    <SideBar 
                        state={{
                            userData: location.state ? location.state.userData : null
                        }}
                    />
                </Grid>
                <Grid item size={{md: 9}} container direction="column" sx={{ width: '100%', backgroundColor: 'white', padding: 4 }}>
                <Grid >
                    <Typography variant="h4">Transactions</Typography>
                    <Divider sx={{ borderBottomWidth: 2, borderColor: 'black', margin: '20px 0' }} />
                </Grid> 
                <Grid container justifyContent="space-around"
                        sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                        <Typography marginLeft={'10rem'}>Product Name</Typography>
                        <Typography>Quantity</Typography>
                        <Typography>Name of Buyer</Typography>
                        <Typography>Total</Typography>
                    </Grid>
                    <Grid item container spacing={2}
                        sx={{
                            display: 'flex',
                            height: '450px',
                            maxHeight: '450px',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            border: '2px solid black',
                            padding: '1rem',
                            width: '100%',
                        }}>
                        {/* Products here */}
                        {
                            transactions ? transactions.map((transaction, index) => (
                                <TransactionItem key={index} data={transaction} />
                            )) : <Typography>No Transaction found.</Typography>
                        }
                    </Grid>
                </Grid>
            </Grid>
            <Dialog
                open={openComplete}
                onClose={closeCompleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >  
                <DialogTitle id="alert-dialog-title">
                {"Do you want to complete this transaction?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    You can't undo this operation
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button variant='contained' onClick={closeCompleteDialog}
                sx={{
                    background: "rgba(112, 5, 5, 1)",
                    "&:hover": {
                    background: "rgba(140, 10, 10, 1)", // Optional: Add hover color
                    },
                }}
                >Cancel</Button>
                <Button variant='contained' color="success" onClick={completeDialogQuery} autoFocus>
                    Proceed
                </Button>
                </DialogActions>
            </Dialog>
            {/** */}

            <Dialog
                open={openCancel}
                onClose={closeCancelDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >  
                <DialogTitle id="alert-dialog-title">
                {"Do you want to delete this transaction?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    You can't undo this operation
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button variant='contained' onClick={closeCancelDialog}
                sx={{
                    background: "rgba(112, 5, 5, 1)",
                    "&:hover": {
                    background: "rgba(140, 10, 10, 1)", // Optional: Add hover color
                    },
                }}
                >Cancel</Button>
                <Button variant='contained' color="success" onClick={cancelDialogQuery} autoFocus>
                    Proceed
                </Button>
                </DialogActions>
            </Dialog>   
        </Container>
        )

    function TransactionItem({data}){
        return (
            <Grid container direction="column" width={'100%'} height={'auto'} sx={{padding: '.5rem', border: '2px solid black' }}>
                <Grid container direction="row" alignItems="center">
                    <Grid item>
                        <img width="120px" src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" alt="product image" />
                    </Grid>
                    <Grid item container sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 1rem', width: '80%' }}>
                        <Typography>{data.productName}</Typography>
                        <Typography>{data.quantity}px</Typography>
                        <Typography>{data.customerName}</Typography>
                        <Typography>P {data.total}</Typography>
                    </Grid>
                </Grid>
                <Grid item sx={{ marginLeft: 'auto'}}>
                    <Button variant="contained" onClick={()=> openCompleteDialog(data.buyIdId)} color="success">COMPLETE</Button> &nbsp;
                    <Button variant='contained' onClick={()=>openCancelDialog(data.buyIdId)}
                        sx={{
                            background: "rgba(112, 5, 5, 1)",
                            "&:hover": {
                            background: "rgba(140, 10, 10, 1)", // Optional: Add hover color
                            },
                        }}
                        >Cancel</Button>
                </Grid>
            </Grid>
        )
    }
}
