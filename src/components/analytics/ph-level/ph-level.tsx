import { Gauge } from "lucide-react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "../../ui/card"
import React from "react";
import { ParameterType } from "@/types/common";
import { SkeletonCard } from "@/components/ui";
import Moment from 'react-moment'

type Props = {
  data?: ParameterType
  isLoading: boolean
  error: Error | null
}

export const PHLevel: React.FC<Props> = ({
  data,
  isLoading,
  error
}) => {
  if (isLoading) return <SkeletonCard />

  if (error) return <p>Error: {error.message}</p>

  const pHLevel = typeof data?.ph === 'number' ? data.ph : 0.00

  const isNormal = pHLevel >= 6.5 && pHLevel <= 8.5

  const createdAt = data?.created_at ? (
    <Moment format="YYYY-MM-DD h:mm a">{data.created_at}</Moment>
  ) : (
    <span>No timestamp available</span>
  );


  return (
    <React.Fragment>
      <Card className={`${isNormal ? "" : "border border-red text-red"}`}>
        <CardHeader>
          <CardTitle>
            <div className={`${isNormal ? "" : " text-red"} flex items-center w-full justify-between`}>
              <div className="flex items-center gap-2">
                pH Level
                <p className={`${isNormal ? "text-slate" : "text-red"} text-sm`}>
                  (Optimal range: 6.5 - 8.5)
                </p>
              </div>
              <Gauge />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{data?.ph}</p>
        </CardContent>
        <CardFooter>
          <div className={`${isNormal ? "text-slate" : " text-red"} flex items-center justify-between w-full`}>
            <p>{isNormal ? "Normal" : "Abnormal"}</p>
            {createdAt}
          </div>
        </CardFooter>
      </Card>
    </React.Fragment>
  )
}
