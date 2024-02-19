---
layout: default
title: "[ARCHIVE] Manual Dashboard Updates"
parent: "[ARCHIVE] Minerva Reporting"
grand_parent: "[ARCHIVE] Minerva - Compliance Scanning"
has_children: false
---

Main steps:

1. Update data files on local machine
2. Upload these data files in the storage bucket located in one of the GCP projects

At the bottom of this document are the associated KQL queries. These can be pasted these in the Dev Tools query builder and will remain cached in your browser. Since they are set up using relative date math, only the `control_impact` numbers need to updated.

## Update data files

Get a copy of all the data files locally from the bucket in GCP project. You can use this command: ``` gsutil cp -r gs://sap-mce-app-stage-minerva <local path where you need to copy these files> ```

Use the KQL queries listed below and paste them into Kibana's Dev Tools. Once they are there, they will be cached. You can select any of them by clicking inside of one, and click the `Run` icon (little triangle) to run the query. Simply Select All to grab the JSON query result.

1. Select the right query and if necessary update the `control_impact`
2. Run the query
3. Control/Command-A within the results window to select the whole JSON file
4. Select the right data file for the query. It should be obvious which one it is. The naming convention is `<chart type code>-elk-<high|medium>.json`. Select All and Paste the copied JSON from ELK into the file. Save it.
5. Repeat for each data file

There are 7 data visualizations each for high and medium. You should have 14 files updated after this.

### Accounts.csv

The Ratio Heatmaps and Dendrogram charts also require an updated download of HSDB data. This is the same data download as described in [Data Exports](data_exports.md). Download a full copy and overwrite/save it over `accounts.csv`.

### Pushing these data files to remote bucket in GCP

There are two projects (staging and Prod), first we need to push these data files to staging bucket using following steps:

1. ``` gcloud auth login ```
2. ``` gcloud config set project sap-mce-app-stage ```
3. Navigate to the base path where you have all these data files
4. Push these data files to the bucket ``` gsutil cp -r . gs://sap-mce-app-stage-minerva ```
5. Verify if all the dashboards are as per expected from this link: https://test-portal.multicloud.int.sap/minerva (all the dashboards must be visible without any errors, if there are any errors, paste the data again from the Dev tools into the data files and re-push to the bucket)
6. Once verification is done push the changes to prod using following steps:
7. ``` gcloud config set project sap-mce-app-prod ```
8. ``` gsutil cp -r . gs://sap-mce-app-prod-minerva ```

This should update all the dashboards for the week.

## KQL Queries

The following is a list of KQL queries that feed different data visualizations. They are clearly marked, so it should be obvious which is for which. Note that some charts require an updated account list. You can get that the same way as described in [Data Exports](data_exports.md).

### Delta Charts

For this and each of the queries, update `control_impact` according to severity (0.8 = high, 0.5 = medium)

    #delta charts
    GET /inspec-*/_search
    {
    "size": 0,
    "query": {
        "bool": {
        "filter": [
            {
            "range": {
                "timestamp": {
                "gte": "now-10d/d",
                "lt": "now/d"
                }
            }
            },
            {
            "term": {
                "control_impact": "0.8"
            }
            },
            {
            "term": {
                "status.keyword": "failed"
            }
            },
            {
            "terms": {
                "mcdb_record.status.keyword": [
                "ACTIVE",
                "NOTINORG",
                ""
                ]
            }
            }
        ]
        }
    },
    "aggs": {
        "my_buckets": {
        "composite": {
            "size": 65000,
            "sources": [
            {
                "date": {
                "date_histogram": {
                    "field": "timestamp",
                    "calendar_interval": "1d",
                    "format": "yyyy-MM-dd"
                }
                }
            },
            {
                "L1": {
                "terms": {
                    "field": "mcdb_record.cost_object.l4_name.keyword"
                }
                }
            },
            {
                "L2": {
                "terms": {
                    "field": "mcdb_record.cost_object.l5_name.keyword"
                }
                }
            },
            {
                "L3": {
                "terms": {
                    "field": "mcdb_record.cost_object.l6_name.keyword"
                }
                }
            },
            {
                "provider": {
                "terms": {
                    "field": "mcdb_record.type.keyword"
                }
                }
            },
            {
                "environment": {
                "terms": {
                    "field": "mcdb_record.sec_attrs.environment.keyword"
                }
                }
            },
            {
                "policy_name": {
                "terms": {
                    "field": "control_title.keyword"
                }
                }
            }
            ]
        }
        }
    }
    }

### Alerts Overview (alerts)

    # alert overview map
    GET /inspec-*/_search
    {
    "size": 0,
    "query": {
        "bool": {
        "filter": [
            {
            "range": {
                "timestamp": {
                "gte": "now-3d/d",
                "lt": "now/d"
                }
            }
            },
            {
            "term": {
                "control_impact": "0.8"
            }
            },
            {
            "term": {
                "status.keyword": "failed"
            }
            },
            {
            "terms": {
                "mcdb_record.status.keyword": [
                "ACTIVE",
                "NOTINORG",
                ""
                ]
            }
            }
        ]
        }
    },
    "aggs": {
        "my_buckets": {
        "composite": {
            "size": 65000,
            "sources": [
            {
                "date": {
                "date_histogram": {
                    "field": "timestamp",
                    "calendar_interval": "1d",
                    "format": "yyyy-MM-dd"
                }
                }
            },
            {
                "L1": {
                "terms": {
                    "field": "mcdb_record.cost_object.l4_name.keyword"
                }
                }
            },
            {
                "L2": {
                "terms": {
                    "field": "mcdb_record.cost_object.l5_name.keyword"
                }
                }
            },
            {
                "L3": {
                "terms": {
                    "field": "mcdb_record.cost_object.l6_name.keyword"
                }
                }
            },
            {
                "L4": {
                "terms": {
                    "field": "mcdb_record.cost_object.l7_name.keyword"
                }
                }
            },
            {
                "provider": {
                "terms": {
                    "field": "mcdb_record.type.keyword"
                }
                }
            },
            {
                "environment": {
                "terms": {
                    "field": "mcdb_record.sec_attrs.environment.keyword"
                }
                }
            },
            {
                "policy_name": {
                "terms": {
                    "field": "control_title.keyword"
                }
                }
            }
            ]
        }
        }
    }
    }

### Passed Skipped Failed (psf)

    # passed - skipped - failed
    GET /inspec-*/_search
    {
    "size": 0,
    "query": {
        "bool": {
        "filter": [
            {
            "range": {
                "timestamp": {
                "gte": "now-3d/d",
                "lt": "now/d"
                }
            }
            },
            {
            "term": {
                "control_impact": "0.8"
            }
            },
            {
            "terms": {
                "mcdb_record.status.keyword": [
                "ACTIVE",
                "NOTINORG",
                ""
                ]
            }
            }
        ]
        }
    },
    "aggs": {
        "my_buckets": {
        "composite": {
            "size": 65000,
            "sources": [
            {
                "date": {
                "date_histogram": {
                    "field": "timestamp",
                    "calendar_interval": "1d",
                    "format": "yyyy-MM-dd"
                }
                }
            },
            {
                "L1": {
                "terms": {
                    "field": "mcdb_record.cost_object.l4_name.keyword"
                }
                }
            },
            {
                "L2": {
                "terms": {
                    "field": "mcdb_record.cost_object.l5_name.keyword"
                }
                }
            },
            {
                "L3": {
                "terms": {
                    "field": "mcdb_record.cost_object.l6_name.keyword"
                }
                }
            },
            {
                "L4": {
                "terms": {
                    "field": "mcdb_record.cost_object.l7_name.keyword"
                }
                }
            },
            {
                "status": {
                "terms": {
                    "field": "status.keyword"
                }
                }
            },
            {
                "provider": {
                "terms": {
                    "field": "mcdb_record.type.keyword"
                }
                }
            },
            {
                "environment": {
                "terms": {
                    "field": "mcdb_record.sec_attrs.environment.keyword"
                }
                }
            },
            {
                "policy_name": {
                "terms": {
                    "field": "control_title.keyword"
                }
                }
            }
            ]
        }
        }
    }
    }


### Year-to-date Chart (ytd)

Note: this query starts on May 5, 2022, after the initial validation period of March and initial fixes during April were absorbed. That makes the tracking more meaningful.

    #ytd-chart
    GET /inspec-*/_search
    {
    "size": 0,
    "query": {
        "bool": {
        "filter": [
            {
            "range": {
                "timestamp": {
                "gte": "2022-05-05",
                "lt": "now/d"
                }
            }
            },
            {
            "term": {
                "control_impact": "0.5"  
            }
            },
            {
            "term": {
                "status.keyword": "failed"
            }
            },
            {
            "terms": {
                "mcdb_record.status.keyword": [
                "ACTIVE",
                "NOTINORG",
                ""
                ]
            }
            }
        ]
        }
    },
    "aggs": {
        "my_buckets": {
        "composite": {
            "size": 65000,
            "sources": [
            {
                "date": {
                "date_histogram": {
                    "field": "timestamp",
                    "calendar_interval": "1d",
                    "format": "yyyy-MM-dd"
                }
                }
            },
            {
                "L1": {
                "terms": {
                    "field": "mcdb_record.cost_object.l4_name.keyword"
                }
                }
            },
            {
                "L2": {
                "terms": {
                    "field": "mcdb_record.cost_object.l5_name.keyword"
                }
                }
            },
            {
                "L3": {
                "terms": {
                    "field": "mcdb_record.cost_object.l6_name.keyword"
                }
                }
            }
            ]
        }
        }
    }
    }

### Ratio Heatmaps 

Note: this visualization also requires an updated `accounts.csv`

    #ratio
    GET /inspec-*/_search
    {
    "size": 0,
    "query": {
        "bool": {
        "filter": [
            {
            "range": {
                "timestamp": {
                "gte": "now-3d/d",
                "lt": "now/d"
                }
            }
            },
            {
            "term": {
                "control_impact": "0.5"
            }
            },
            {
            "term": {
                "status.keyword": "failed"
            }
            },
            {
            "terms": {
                "mcdb_record.status.keyword": [
                "ACTIVE",
                "NOTINORG",
                ""
                ]
            }
            }
        ]
        }
    },
    "aggs": {
        "my_buckets": {
        "composite": {
            "size": 65000,
            "sources": [
            {
                "date": {
                "date_histogram": {
                    "field": "timestamp",
                    "calendar_interval": "1d",
                    "format": "yyyy-MM-dd"
                }
                }
            },
            {
                "L1": {
                "terms": {
                    "field": "mcdb_record.cost_object.l4_name.keyword"
                }
                }
            },
            {
                "L2": {
                "terms": {
                    "field": "mcdb_record.cost_object.l5_name.keyword"
                }
                }
            },
            {
                "L3": {
                "terms": {
                    "field": "mcdb_record.cost_object.l6_name.keyword"
                }
                }
            },
            {
                "L4": {
                "terms": {
                    "field": "mcdb_record.cost_object.l7_name.keyword"
                }
                }
            }
            ]
        }
        }
    }
    }

### Dendrogram 

Note: this visualization also requires an updated `accounts.csv`

    #dendro
    GET /inspec-*/_search
    {
    "size": 0,
    "query": {
        "bool": {
        "filter": [
            {
            "range": {
                "timestamp": {
                "gte": "now-3d/d",
                "lt": "now/d"
                }
            }
            },
            {
            "term": {
                "control_impact": "0.8"
            }
            },
            {
            "term": {
                "status.keyword": "failed"
            }
            },
            {
            "terms": {
                "mcdb_record.status.keyword": [
                "ACTIVE",
                "NOTINORG",
                ""
                ]
            }
            }
        ]
        }
    },
    "aggs": {
        "my_buckets": {
        "composite": {
            "size": 65000,
            "sources": [
            {
                "date": {
                "date_histogram": {
                    "field": "timestamp",
                    "calendar_interval": "1d",
                    "format": "yyyy-MM-dd"
                }
                }
            },
            {
                "L1": {
                "terms": {
                    "field": "mcdb_record.cost_object.l4_name.keyword"
                }
                }
            },
            {
                "L2": {
                "terms": {
                    "field": "mcdb_record.cost_object.l5_name.keyword"
                }
                }
            },
            {
                "L3": {
                "terms": {
                    "field": "mcdb_record.cost_object.l6_name.keyword"
                }
                }
            },
            {
                "policy_name": {
                "terms": {
                    "field": "control_title.keyword"
                }
                }
            }
            ]
        }
        }
    }
    }

### Compliance Heatmap

GET /inspec-*/_search
{
  "size": 0,
  "query": {
    "bool": {
      "filter": [
        {
          "range": {
            "timestamp": {
              "gte": "now-3d/d",
              "lt": "now/d"
            }
          }
        },
        {
          "term": {
            "control_impact": "0.8"
          }
        },
        {
          "terms": {
            "mcdb_record.status.keyword": [
              "ACTIVE",
              "NOTINORG",
              ""
            ]
         }
        }
      ]
    }
  },
  "aggs": {
    "my_buckets": {
      "composite": {
        "size": 65000,
        "sources": [
          {
            "date": {
              "date_histogram": {
                "field": "timestamp",
                "calendar_interval": "1d",
                "format": "yyyy-MM-dd"
              }
            }
          },
          {
            "L1": {
              "terms": {
                "field": "mcdb_record.cost_object.l4_name.keyword"
              }
            }
          },
          {
            "L2": {
              "terms": {
                "field": "mcdb_record.cost_object.l5_name.keyword"
              }
            }
          },
          {
            "L3": {
              "terms": {
                "field": "mcdb_record.cost_object.l6_name.keyword"
              }
            }
          },
          {
            "L4": {
              "terms": {
                "field": "mcdb_record.cost_object.l7_name.keyword"
              }
            }
          },
          {
            "status": {
              "terms": {
                "field": "status.keyword"
              }
            }
          }
        ]
      }
    }
  }
}