import React, { Component } from 'react';
import { GridListTile, GridListTileBar } from '@material-ui/core';

/**
 * @description Component to render each Job Tile in a grid 
 * this component is used to display basic information to the end user
 * This uses Material's GridListTile component.
 * @param { Object } props.job is the object containing all job information from the DB
 * @param { Function } props.detailOpen is the function used to change state in App to render the JobDetail Modal
 */

 // Material-ui often times allows rendering using a withStyles method. However, if you want specific styles to overwrite material
 // and don't wish to worry about the css render stack passing styles inline is preferred.
 // Below we use an object that follows JSS formatting ie: border-radius becomes borderRadius
const styles = {
  gridTile: {
    padding: 10,
    borderRadius: 3
  }
}

// Helper function to clean up the url endpoint for using clearbit API
// clearbit's api utilizes root domains ie: google.com, facebook.com etc to retrieve logo data.
// if clearbit can't find the logo it return's a 404 could be useful for fixing the functionality
// where the placeholder url currently doesn't render when clearbits fails to retrieve a logo.
const urlFix = (url) => {
  let cleanDomain = url.split('www.')[1];
  return `https://logo.clearbit.com/${cleanDomain}`;
}

const JobMin = (props) => (
        <GridListTile style={styles.gridTile} onClick={() => props.detailOpen(props.job)}>
        <img 
        src={urlFix(props.job.company.webSite) || props.job.company.logoUrl} 
        alt={props.job.company.name}
         />
        <GridListTileBar title={props.job.company.name} subtitle={<span>{props.job.company.jobTitle}</span>} />
      </GridListTile>
)

export default JobMin;

