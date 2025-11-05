"use client"
import React, { useState } from 'react'
import createMission from '@/app/requests/admin/mission/createMission'
import deleteMission from '@/app/requests/admin/mission/deleteMission'


export default function MissionsPage() {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [rewardCoins, setRewardCoins] = useState(0)
  const [rewardXp, setRewardXp] = useState(0)
  const [targetType, setTargetType] = useState('')
  const [idBadge, setIdBadge] = useState<number | undefined>(undefined)
  const [idMissionDeleted, setIdMissionDeleted] = useState<number | undefined>(undefined)
  const [error, setError] = useState('')

  const createMissionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (title && content && rewardCoins && rewardXp && targetType) {

      const data = {
        title,
        content,
        rewardCoins,
        rewardXp,
        targetType,
        idBadge
      }
  
      const res = await createMission(data)

      if (!res.ok) {
        setError(`Erreur lors de la création d'une missions`)
      }
    } else {
      setError('Veuillez compléter tous les champs')
    }
  }

  const deletMissionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (idMissionDeleted) {

      const res = await deleteMission({ idMission: idMissionDeleted })
      if (!res.ok) {
        setError(`Erreur lors de la suppréssion d'une missions`)
      }
    } else {
      setError('Veuillez rentrer un idMission')
    }
  }

  return (
    <div>
      {
        error && (
          <p className='text-red-500 text-xl'>{error}</p>
        )
      }
      <form onSubmit={createMissionSubmit}>
        <input
          type='text'
          value={title}
          placeholder='Enter title'
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          value={content}
          placeholder='Enter content'
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type='text'
          value={targetType}
          placeholder='Enter targetType'
          onChange={(e) => setTargetType(e.target.value)}
        />

        <input
          type='numeric'
          value={idBadge}
          placeholder='Enter targetType (optionnel)'
          onChange={(e) => setIdBadge(parseInt(e.target.value))}
        />

        <input
          type="numeric"
          value={rewardCoins}
          placeholder='Enter numbers coins'
          onChange={(e) => setRewardCoins(parseInt(e.target.value))}
        />

        <input
          type="numeric"
          value={rewardXp}
          placeholder='Enter numbers exp'
          onChange={(e) => setRewardXp(parseInt(e.target.value))}
        />

        <button type="submit">Create</button>
      </form>

      <form onSubmit={deletMissionSubmit}>
        <input
          type="numeric"
          value={idMissionDeleted}
          placeholder='Enter idMission'
          onChange={(e) => setIdMissionDeleted(parseInt(e.target.value))}
        />

        <button type="submit">Delete</button>
      </form>
    </div>
  )
}
