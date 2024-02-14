import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative', // Make root container relative to position absolutely within
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '50px',
    marginBottom: '40px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '16px',
    marginRight:'330px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  button: {
    textTransform: 'capitalize',
    margin: '0 8px',
    width: '130px', // Adjusted width of Custom button
  },
  messageContainer: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    backgroundColor: '#f0f0f0',
    padding: '8px',
    borderRadius: '4px',
  },
  catalogItem: {
    position: 'relative', // Make container relative to position absolutely within
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 50px',
  },
  catalogImage: {
    width: '100px',
    height: '100px',
    marginBottom: '10px', // Added vertical gap below the image text
  },
  sectionHeader: {
    fontWeight: 'bold',
    marginBottom: '20px',
    marginRight: '550px', // Left margin added
  },
  sectionContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    margin: '20px 0',
  },
}));

const RuleCatalogPage = () => {
  const classes = useStyles();
  const [ruleSets, setRuleSets] = useState([]);
  const [selectedImageText, setSelectedImageText] = useState(null);

  useEffect(() => {
    // Fetch data from JSON file
    fetch('Comprule.json')
      .then(response => response.json())
      .then(data => setRuleSets(data))
      .catch(error => console.error('Error fetching rule sets:', error));
  }, []);

  const handleButtonClick = (imageText) => {
    if (imageText !== null) {
      setSelectedImageText(imageText);
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Compliance Rule Sets
      </Typography>
      <div className={classes.buttonContainer}>
        <div className={classes.buttonGroup}>
          <Button variant="contained" color="primary" className={classes.button} onClick={() => handleButtonClick("Custom: Default")}>
            Custom
          </Button>
          <div style={{ width: '30px' }} /> {/* Added space */}
          <Typography variant="body1">
            OR
          </Typography>
          <div style={{ width: '30px' }} /> {/* Added space */}
          <Typography variant="body1">
            Choose from an option below
          </Typography>
        </div>
      </div>
      <div className={classes.sectionContainer} style={{ marginTop: '20px' }}> {/* Adjusted margin */}
        <Typography variant="h6" className={classes.sectionHeader}>
          Available Rules Sets -
        </Typography>
      </div>
      <div className={classes.buttonGroup} style={{ marginTop: '8px' }}>
        {ruleSets.map(ruleSet => (
          <div key={ruleSet.id} className={classes.catalogItem}>
            <img
              src={ruleSet.image}
              alt={ruleSet.image_text}
              className={classes.catalogImage}
              onClick={() => handleButtonClick(null)} // Changed onClick behavior for images
            />
            <Typography variant="body1">{ruleSet.image_text}</Typography>
            <Button
              variant="contained"
              color="primary"
              href={ruleSet.button_url}
              className={classes.button}
              onClick={() => handleButtonClick(ruleSet.image_text)}
              disabled={ruleSet.image_text === "Health Compliance - 239"} // Disable button if image_text is "Health Compliance - 239"
              style={{ marginTop: '8px', position: 'sticky', top: '90%' }} // Fixed button positioning with top margin
            >
              Add New
            </Button>
          </div>
        ))}
      </div>
      {selectedImageText && (
        <div className={classes.messageContainer}>
          <Typography variant="body1">You are adding a new rule for: {selectedImageText}</Typography>
        </div>
      )}
    </div>
  );
};

export default RuleCatalogPage;
