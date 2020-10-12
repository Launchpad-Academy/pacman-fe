import React, { useEffect, useContext, useState, useRef } from 'react';
import { Grid, Typography, Button, makeStyles, withStyles, Paper, Container, InputAdornment, IconButton } from '@material-ui/core';
import { HeaderElements } from 'components';
import { LayoutContext } from 'contexts';
import FileIcon from '../../../images/file.png';
import { API } from 'helpers/index';
import { notify } from 'components/index';
import { LoadingScreen } from 'components';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { LayoutConfig } from "configurations";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import UploadIcon from '../../../images/upload.png';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  buttons: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  startButton: {
    display: 'block',
    marginTop: theme.spacing(2),
    overflow: "auto",
    margin: "auto",
    position: "flex",
  },
  formControl: {
    margin: 0,
    fullWidth: true,
    display: 'flex',
    wrap: 'nowrap'
  },
  paper: {
    backgroundColor: "#21243f",
    overflow: "auto",
    margin: "auto",
    position: "flex",
    width: "60%",
  },
  testCheckBox: {
    color: "#96a7af"
  },
  icon: {
    fill: "#1ed69e",
  },
  
}));

let applicationTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main:
        LayoutConfig.theme !== undefined
          ? LayoutConfig.theme.colors !== undefined
            ? LayoutConfig.theme.colors.primary !== undefined
              ? LayoutConfig.theme.colors.primary
              : null
            : null
          : null
    },
    secondary: {
      main:
        LayoutConfig.theme !== undefined
          ? LayoutConfig.theme.colors !== undefined
            ? LayoutConfig.theme.colors.secondary !== undefined
              ? LayoutConfig.theme.colors.secondary
              : null
            : null
          : null
    }
  },
  overrides: {
    MuiFormControl: {
      root: {
        outline: "red"
      }
    }
  },
  formControl: {
    outlined: {
      borderColor: "red"
    }
  },
  typography: {
    h6: {
      fontFamily: "Arial Rounded MT, Helvetica, sans-serif",
      fontWeight: "bold",
      fontSize: 18,
      color: "white"
    },
    body1: {
      fontFamily: "Arial Unicode MS, Helvetica, sans-serif",
      fontSize: 16,
      color: "#d0d0d0"
    },
    body2: { fontFamily: "Helvetica, sans-serif", fontSize: 12 },
    caption: {
      color: "#d0d0d0 ",
      fontSize: "12px ",
      fontFamily: "Helvetica, sans-serif"
    },
    h5: {
      fontFamily: "Arial Rounded MT, Helvetica, sans-serif",
      fontWeight: "bold",
      fontSize: 44,
      color: "#00acc1"
    },
    subtitle1: {
      fontFamily: "Arial Rounded MT, Helvetica, sans-serif",
      fontWeight: "bold",
      fontSize: 10,
      color: "white"
    }
  }
});


export const Home = () => {
  const classes = useStyles();
  const [documentFile,setDocumentFile] = useState('');
  const [isValid,setIsValid] = useState(true);
  const errorText='Upload Model';
  let fileUrl = useRef('');
  let fileIsValid;
  const [previewUrl,setPreviewUrl] = useState();
  let [isLoading,setIsLoading] = useState(true);
  const model = [];
  const [models,setModels] = useState(model);


  //Select Drop Down
  const [modelSelected, setModelSelected] = useState('');
  const [modelUploaded, setModelUploaded] = useState('');
  const [open, setOpen] = useState(false);
  const [checked,setChecked] = useState({
    checkedA: false
  });

  const GreenCheckbox = withStyles({
    root: {
      color: "#96a7af",
      '&$checked': {
        color: "#1ed69e",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  const handleChange = (event) => {
    setModelSelected(event.target.value);
    console.log(modelSelected+ "is selected by user");
  };

  const handleChecked = (event) => {
    // setChecked({ ...checked, [event.target.name]: event.target.checked });
    // console.log(event.target.checked);
    console.log(checked);
    setChecked(checked =>({checkedA: !checked.checkedA}));
    console.log(checked);
    console.log("***********************");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


  useEffect(()=>{
    API.getUserDetails((res)=>{
      const modelArray = res.data.data.customerAdditionalData.fileName;
      const modelsTemp = [];
      for(let i=0;i<modelArray.length;i++){
        modelsTemp.push(modelArray[i]);
      }

      setModels(modelsTemp);

      console.log(models);
      setIsLoading(false);
    });
  },[modelUploaded]);

  const startGame = (event) =>{

    if(modelSelected ===''){
      notify('Select a model first to start');
      return;
    }
   
    let demoMode = checked.checkedA;
    let userData = { fileUrl: modelSelected, demoMode: demoMode};
    
    console.log(userData);

    API.startGame(userData , (res) =>{
      console.log('Hopeful for a Start of Game'+ res);
      notify('Finding a match');
    });
  };

  const imageChangeHandler = (event) =>{
    let pickedFile;
    fileIsValid = isValid;

    if(event.target.files && event.target.files.length === 1){
      pickedFile = event.target.files[0];
      setDocumentFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    }else{
      fileIsValid = false;
    }

  };

  useEffect(()=>{
    if(!documentFile){
      return;
    }
    
    const formData = new FormData();
    formData.append('documentFile',documentFile);

    API.uploadDocument(formData, (res) =>{
      let data ={fileUrl: res.data.data.documentFileUrl.original, fileName: res.data.data.documentFileUrl.fileName};
      // fileUrl.current = res.data.data.documentFileUrl.original;
      setModelUploaded(res.data.data.documentFilename);
      // console.log(res.data.data.documentFileUrl.fileName);
      API.updateUser(data, (res) =>{
        setPreviewUrl(FileIcon);
        notify('File Uploaded Successfully');
        window.location.href = "/home";
        setModelUploaded('new');
      });
    });
  },[documentFile]);
  
  return (  
    <MuiThemeProvider theme={applicationTheme}>
      {isLoading ? <LoadingScreen loadingText="Fetching User Models"></LoadingScreen> :

        <Paper className={classes.paper} >
          <Grid container justify='flex-start' direction='row' alignItems='center' className={classes.root}>
            <Grid item xs={12} xl={2} lg={4} md={6} sm={8}>
  
            <div className={classes.root}>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel htmlFor="demo-controlled-open-select">Select your model</InputLabel>
                <Select
                  id="demo-controlled-open-select"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={modelSelected}
                  onChange={handleChange}
                  inputProps={{
                    classes: {
                      icon: classes.icon,
                    },
                  }}
                  labelWidth={130}
                >
                  <MenuItem aria-label="None" value="None">
                    <em>None</em>
                  </MenuItem>

                  {models.map((value, index) => {
                    return <MenuItem key={index} value={index}>{value}</MenuItem>;
                  })}
            
                </Select>
              </FormControl>

              <div>
                  <div>
                    {previewUrl && <img src={previewUrl} alt="Preview" width="200px" height="200px"/>}
                    {!previewUrl && !fileIsValid && <p style={{color:'#96a7af'}}>{errorText}</p>}
                  </div>                    
                </div>

              <label htmlFor="contained-button-file">
                <input accept="file/*" 
                  className={classes.input} 
                  id="contained-button-file" 
                  multiple 
                  type="file" 
                  required
                  description="document file"
                  name="documentFile"
                  onChange = {imageChangeHandler}
                />
                <img src={UploadIcon} alt="upload icon" />
              </label>

              <form noValidate>
                <FormControlLabel
                  control={
                    <GreenCheckbox
                      checked={checked.checkedA}
                      onChange={handleChecked}
                      name="checked"
                    />
                  }
                  label={<Typography className={classes.testCheckBox}> Test against demo user</Typography>}
                  color="primary"
                />
                <Button fullWidth variant="contained" color="primary" className={classes.startButton} onClick={startGame}>Start</Button>
                  
              </form>
            </div>
            
            </Grid>
          </Grid>
        </Paper>
      // </Container>
      }
    </MuiThemeProvider>
  );
  
};
